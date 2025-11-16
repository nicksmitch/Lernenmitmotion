"""
Regenerate exercise images with improved prompts for better framing.
"""
import asyncio
import sys
import os
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent / 'backend'))

from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from emergentintegrations.llm.openai.image_generation import OpenAIImageGeneration
import base64
from datetime import datetime, timezone

env_path = Path(__file__).parent.parent / 'backend' / '.env'
load_dotenv(env_path)

mongo_url = os.environ['MONGO_URL']
db_name = os.environ['DB_NAME']

# Improved prompts with better framing instructions
IMPROVED_PROMPTS = {
    # Individual Active
    "Jumping Jacks": "Full body illustration of person doing jumping jacks exercise, centered composition, arms raised above head, legs spread, simple clean background, educational diagram style, square format, well-framed",
    "Schreibtisch-Liegestütze": "Side view illustration of person doing desk push-ups against table edge, full body visible, proper form, centered composition, clean minimalist background, educational diagram, square format",
    "Kniebeugen": "Side view illustration of person doing squat exercise, full body from head to feet, proper squat form, centered in frame, clean simple background, educational style, square format",
    "Nacken- und Schulterkreisen": "Front view illustration of person doing neck and shoulder rolls, upper body focus but full torso visible, movement arrows showing rotation, centered composition, clean background, educational diagram, square format",
    "Ausfallschritte": "Side view illustration of person doing lunge exercise, full body visible from head to feet, proper lunge form, centered in frame, clean simple background, educational style, square format",
    "Hampelmann-Variationen": "Multiple poses of person doing jumping jack variations, three figures side by side, full body visible, centered composition, clean background, educational diagram, square format",
    "Wandsitzen": "Side view illustration of person doing wall sit exercise, full body visible against wall, proper 90-degree knee angle, centered in frame, clean background, educational style, square format",
    
    # Individual Relaxed
    "4-7-8 Atemtechnik": "Centered illustration of person sitting in meditation posture doing breathing exercise, full upper body visible, peaceful expression, hands on knees, clean simple background, square format",
    "Progressive Muskelentspannung": "Centered illustration of person lying down in relaxed position for progressive muscle relaxation, full body visible, peaceful setting, clean background, square format",
    "Achtsamkeitsmeditation": "Centered illustration of person sitting cross-legged in meditation, full upper body and legs visible, peaceful serene expression, clean minimal background, square format",
    "Augen-Entspannung (Palming)": "Centered front view of person sitting upright with hands gently covering eyes for palming exercise, upper body visible, peaceful expression, clean background, square format",
    "Body Scan Meditation": "Centered illustration of person lying flat on back for body scan meditation, full body visible from head to feet, relaxed posture, peaceful setting, clean background, square format",
    "Geführte Fantasiereise": "Centered illustration of person in peaceful visualization meditation, sitting or lying comfortably, dreamy peaceful atmosphere, nature elements subtly in background, square format",
    "Dankbarkeitsübung": "Centered illustration of person sitting in grateful meditation with gentle smile, hands on heart center, peaceful warm expression, clean simple background, square format",
    
    # Teacher Group Active
    "Partner-Koordinationsspiel": "Illustration of two people facing each other doing mirror coordination exercise, both full bodies visible, centered composition, clean background, educational style, square format",
    "Gordischer Knoten": "Top-down view of group of people holding hands in tangled formation, all participants visible, centered circular composition, team building activity, clean background, square format",
    "Rücken an Rücken aufstehen": "Side view illustration of two people sitting back-to-back standing up together, both full bodies visible, proper form, centered composition, clean background, square format",
    "Gruppen-Plank Challenge": "Illustration of multiple people in plank position side by side, all full bodies visible, proper plank form, centered composition, group exercise, clean background, square format",
    "Menschen-Knoten Bewegungsspiel": "Illustration of group forming human knot with connected hands, all participants visible, playful dynamic composition, team activity, clean background, square format",
    "Partner-Yoga: Baum": "Side view of two people doing tree pose together in partner yoga, both full bodies visible, balanced composition, peaceful setting, clean background, square format",
    
    # Teacher Group Relaxed
    "Gruppen-Atemkreis": "Illustration of group standing in circle doing synchronized breathing exercise together, all participants visible, peaceful unified atmosphere, clean background, square format",
    "Stille Minute Challenge": "Illustration of classroom with students sitting in silent meditation, peaceful calm atmosphere, all participants visible, educational setting, clean organized composition, square format",
    "Partner-Rückenmassage": "Illustration of two people where one gives shoulder massage to other, both visible, caring peaceful interaction, proper positioning, clean background, square format",
    "Geführte Gruppen-Fantasiereise": "Illustration of group with heads down on desks in relaxed peaceful guided meditation, classroom setting, all participants visible, calm atmosphere, square format",
    "Klangschalen-Meditation": "Illustration of singing bowl meditation in classroom setting with students sitting peacefully, focused students, singing bowl prominently visible, calm atmosphere, square format"
}

async def regenerate_images():
    """Regenerate images with improved prompts."""
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    image_gen = OpenAIImageGeneration(api_key=os.environ.get('EMERGENT_LLM_KEY'))
    
    print("=" * 60)
    print("REGENERIERE BILDER MIT VERBESSERTEN PROMPTS")
    print("=" * 60)
    
    # Get all exercises
    exercises = await db.exercises.find({}).to_list(100)
    
    total = len(exercises)
    updated = 0
    skipped = 0
    
    for idx, exercise in enumerate(exercises, 1):
        title = exercise['title']
        
        if title in IMPROVED_PROMPTS:
            print(f"\n[{idx}/{total}] Regeneriere: {title}")
            
            try:
                # Generate new image
                print(f"  → Generiere neues Bild...")
                images = await image_gen.generate_images(
                    prompt=IMPROVED_PROMPTS[title],
                    model="gpt-image-1",
                    number_of_images=1
                )
                
                if images and len(images) > 0:
                    image_base64 = base64.b64encode(images[0]).decode('utf-8')
                    image_url = f"data:image/png;base64,{image_base64}"
                    
                    # Update in database
                    await db.exercises.update_one(
                        {"id": exercise['id']},
                        {"$set": {"image_url": image_url}}
                    )
                    
                    print(f"  ✓ Bild aktualisiert")
                    updated += 1
                else:
                    print(f"  ✗ Keine Bildgenerierung")
                    skipped += 1
                    
            except Exception as e:
                print(f"  ✗ Fehler: {str(e)}")
                skipped += 1
        else:
            print(f"[{idx}/{total}] Überspringe: {title} (kein verbesserter Prompt)")
            skipped += 1
    
    print("\n" + "=" * 60)
    print(f"ZUSAMMENFASSUNG:")
    print(f"  Aktualisiert: {updated}")
    print(f"  Übersprungen: {skipped}")
    print(f"  Gesamt: {total}")
    print("=" * 60)
    
    client.close()

if __name__ == "__main__":
    asyncio.run(regenerate_images())
