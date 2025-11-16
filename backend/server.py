from fastapi import FastAPI, APIRouter, HTTPException, Request, Response, Cookie
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import base64
import asyncio
from emergentintegrations.llm.openai.image_generation import OpenAIImageGeneration

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Define Models
class User(BaseModel):
    model_config = ConfigDict(extra="ignore", populate_by_name=True)
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    name: str
    picture: Optional[str] = None
    role: str = "individual"  # individual or teacher
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class UserSession(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    session_token: str
    expires_at: datetime
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StudySession(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    duration_minutes: int
    started_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    ended_at: Optional[datetime] = None
    breaks_taken: int = 0
    status: str = "active"  # active, completed

class Exercise(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    category: str  # active or relaxed
    title: str
    description: str
    duration_minutes: int
    image_url: Optional[str] = None
    roles: List[str] = ["individual", "teacher"]  # which roles can access this exercise
    is_group_exercise: bool = False  # True for group/partner exercises
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class UserStats(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    total_study_minutes: int = 0
    total_breaks: int = 0
    last_timer_duration: int = 25  # Default 25 minutes
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Request/Response Models
class SessionIDRequest(BaseModel):
    session_id: str

class StudySessionCreate(BaseModel):
    duration_minutes: int

class StudySessionUpdate(BaseModel):
    breaks_taken: Optional[int] = None
    status: Optional[str] = None

class TimerUpdate(BaseModel):
    duration_minutes: int

class ExerciseGenerate(BaseModel):
    category: str
    title: str
    description: str
    duration_minutes: int
    prompt: str

# Helper Functions
async def get_current_user(request: Request) -> Optional[User]:
    # Check cookie first
    session_token = request.cookies.get("session_token")
    
    # Fallback to Authorization header
    if not session_token:
        auth_header = request.headers.get("Authorization")
        if auth_header and auth_header.startswith("Bearer "):
            session_token = auth_header.split(" ")[1]
    
    if not session_token:
        return None
    
    # Find session
    session = await db.user_sessions.find_one({
        "session_token": session_token,
        "expires_at": {"$gt": datetime.now(timezone.utc).isoformat()}
    })
    
    if not session:
        return None
    
    # Find user
    user_doc = await db.users.find_one({"id": session["user_id"]}, {"_id": 0})
    if not user_doc:
        return None
    
    if isinstance(user_doc.get('created_at'), str):
        user_doc['created_at'] = datetime.fromisoformat(user_doc['created_at'])
    
    return User(**user_doc)

# Auth Endpoints
@api_router.post("/auth/session")
async def process_session_id(session_data: SessionIDRequest, response: Response):
    import httpx
    
    # Call Emergent Auth to get session data
    async with httpx.AsyncClient() as client:
        try:
            auth_response = await client.get(
                "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data",
                headers={"X-Session-ID": session_data.session_id}
            )
            auth_response.raise_for_status()
            session_info = auth_response.json()
        except Exception as e:
            raise HTTPException(status_code=401, detail=f"Invalid session ID: {str(e)}")
    
    # Check if user exists
    user_doc = await db.users.find_one({"email": session_info["email"]}, {"_id": 0})
    
    if not user_doc:
        # Create new user
        new_user = User(
            email=session_info["email"],
            name=session_info["name"],
            picture=session_info.get("picture")
        )
        user_dict = new_user.model_dump()
        user_dict['created_at'] = user_dict['created_at'].isoformat()
        await db.users.insert_one(user_dict)
        user = new_user
        
        # Create initial stats
        stats = UserStats(user_id=user.id)
        stats_dict = stats.model_dump()
        stats_dict['updated_at'] = stats_dict['updated_at'].isoformat()
        await db.user_stats.insert_one(stats_dict)
    else:
        if isinstance(user_doc.get('created_at'), str):
            user_doc['created_at'] = datetime.fromisoformat(user_doc['created_at'])
        user = User(**user_doc)
    
    # Create session
    session_token = session_info["session_token"]
    expires_at = datetime.now(timezone.utc) + timedelta(days=7)
    
    new_session = UserSession(
        user_id=user.id,
        session_token=session_token,
        expires_at=expires_at
    )
    
    session_dict = new_session.model_dump()
    session_dict['expires_at'] = session_dict['expires_at'].isoformat()
    session_dict['created_at'] = session_dict['created_at'].isoformat()
    await db.user_sessions.insert_one(session_dict)
    
    # Set cookie
    response.set_cookie(
        key="session_token",
        value=session_token,
        httponly=True,
        secure=True,
        samesite="none",
        path="/",
        max_age=7 * 24 * 60 * 60
    )
    
    return {
        "user": user.model_dump(),
        "session_token": session_token
    }

@api_router.get("/auth/me")
async def get_me(request: Request):
    user = await get_current_user(request)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return user

@api_router.post("/auth/logout")
async def logout(request: Request, response: Response):
    session_token = request.cookies.get("session_token")
    if session_token:
        await db.user_sessions.delete_one({"session_token": session_token})
    
    response.delete_cookie(key="session_token", path="/")
    return {"message": "Logged out"}

# Study Sessions
@api_router.post("/sessions", response_model=StudySession)
async def create_session(session_data: StudySessionCreate, request: Request):
    user = await get_current_user(request)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    session = StudySession(
        user_id=user.id,
        duration_minutes=session_data.duration_minutes
    )
    
    session_dict = session.model_dump()
    session_dict['started_at'] = session_dict['started_at'].isoformat()
    await db.study_sessions.insert_one(session_dict)
    
    return session

@api_router.put("/sessions/{session_id}", response_model=StudySession)
async def update_session(session_id: str, update_data: StudySessionUpdate, request: Request):
    user = await get_current_user(request)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    session_doc = await db.study_sessions.find_one({"id": session_id, "user_id": user.id}, {"_id": 0})
    if not session_doc:
        raise HTTPException(status_code=404, detail="Session not found")
    
    update_fields = {}
    if update_data.breaks_taken is not None:
        update_fields["breaks_taken"] = update_data.breaks_taken
    if update_data.status:
        update_fields["status"] = update_data.status
        if update_data.status == "completed":
            update_fields["ended_at"] = datetime.now(timezone.utc).isoformat()
    
    await db.study_sessions.update_one(
        {"id": session_id},
        {"$set": update_fields}
    )
    
    # Update user stats if completed
    if update_data.status == "completed":
        stats_doc = await db.user_stats.find_one({"user_id": user.id}, {"_id": 0})
        if stats_doc:
            new_total = stats_doc.get("total_study_minutes", 0) + session_doc["duration_minutes"]
            new_breaks = stats_doc.get("total_breaks", 0) + update_fields.get("breaks_taken", session_doc.get("breaks_taken", 0))
            
            await db.user_stats.update_one(
                {"user_id": user.id},
                {"$set": {
                    "total_study_minutes": new_total,
                    "total_breaks": new_breaks,
                    "updated_at": datetime.now(timezone.utc).isoformat()
                }}
            )
    
    updated_doc = await db.study_sessions.find_one({"id": session_id}, {"_id": 0})
    if isinstance(updated_doc.get('started_at'), str):
        updated_doc['started_at'] = datetime.fromisoformat(updated_doc['started_at'])
    if updated_doc.get('ended_at') and isinstance(updated_doc['ended_at'], str):
        updated_doc['ended_at'] = datetime.fromisoformat(updated_doc['ended_at'])
    
    return StudySession(**updated_doc)

# Stats
@api_router.get("/stats", response_model=UserStats)
async def get_stats(request: Request):
    user = await get_current_user(request)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    stats_doc = await db.user_stats.find_one({"user_id": user.id}, {"_id": 0})
    if not stats_doc:
        # Create default stats
        stats = UserStats(user_id=user.id)
        stats_dict = stats.model_dump()
        stats_dict['updated_at'] = stats_dict['updated_at'].isoformat()
        await db.user_stats.insert_one(stats_dict)
        return stats
    
    if isinstance(stats_doc.get('updated_at'), str):
        stats_doc['updated_at'] = datetime.fromisoformat(stats_doc['updated_at'])
    
    return UserStats(**stats_doc)

@api_router.put("/stats/timer")
async def update_timer(timer_data: TimerUpdate, request: Request):
    user = await get_current_user(request)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    await db.user_stats.update_one(
        {"user_id": user.id},
        {"$set": {
            "last_timer_duration": timer_data.duration_minutes,
            "updated_at": datetime.now(timezone.utc).isoformat()
        }}
    )
    
    return {"message": "Timer duration updated"}

# Exercises
@api_router.get("/exercises/{category}", response_model=List[Exercise])
async def get_exercises(category: str, request: Request):
    user = await get_current_user(request)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    if category not in ["active", "relaxed"]:
        raise HTTPException(status_code=400, detail="Invalid category")
    
    exercises = await db.exercises.find({"category": category}, {"_id": 0}).to_list(100)
    
    for exercise in exercises:
        if isinstance(exercise.get('created_at'), str):
            exercise['created_at'] = datetime.fromisoformat(exercise['created_at'])
    
    return exercises

@api_router.post("/exercises/generate")
async def generate_exercise(exercise_data: ExerciseGenerate, request: Request):
    user = await get_current_user(request)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    # Generate image
    try:
        image_gen = OpenAIImageGeneration(api_key=os.environ.get('EMERGENT_LLM_KEY'))
        images = await image_gen.generate_images(
            prompt=exercise_data.prompt,
            model="gpt-image-1",
            number_of_images=1
        )
        
        if images and len(images) > 0:
            image_base64 = base64.b64encode(images[0]).decode('utf-8')
            image_url = f"data:image/png;base64,{image_base64}"
        else:
            image_url = None
    except Exception as e:
        logging.error(f"Error generating image: {str(e)}")
        image_url = None
    
    # Create exercise
    exercise = Exercise(
        category=exercise_data.category,
        title=exercise_data.title,
        description=exercise_data.description,
        duration_minutes=exercise_data.duration_minutes,
        image_url=image_url
    )
    
    exercise_dict = exercise.model_dump()
    exercise_dict['created_at'] = exercise_dict['created_at'].isoformat()
    await db.exercises.insert_one(exercise_dict)
    
    return exercise

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()