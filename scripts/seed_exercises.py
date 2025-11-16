"""
Script to generate and seed exercise data with AI-generated images.
Based on scientific literature for study breaks.
"""
import asyncio
import sys
import os
from pathlib import Path

# Add backend to path
sys.path.insert(0, str(Path(__file__).parent.parent / 'backend'))

from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from emergentintegrations.llm.openai.image_generation import OpenAIImageGeneration
import base64
from datetime import datetime, timezone
import uuid

# Load environment
env_path = Path(__file__).parent.parent / 'backend' / '.env'
load_dotenv(env_path)

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
db_name = os.environ['DB_NAME']

# Exercise data based on scientific literature
ACTIVE_EXERCISES = [
    {
        "title": "Jumping Jacks",
        "description": "1. Stehe aufrecht mit Füßen zusammen und Armen an den Seiten.\n2. Springe und spreize gleichzeitig deine Beine schulterbreit.\n3. Hebe gleichzeitig deine Arme über den Kopf.\n4. Springe zurück in die Ausgangsposition.\n5. Wiederhole für 3 Minuten in einem angenehmen Tempo.\n\nVorteile: Aktiviert den Kreislauf, verbessert die Durchblutung und steigert die Energie.",
        "duration_minutes": 3,
        "prompt": "Simple illustration of a person doing jumping jacks exercise, side view, clean minimalist style, educational diagram, light background, suitable for study break guide"
    },
    {
        "title": "Schreibtisch-Liegestütze",
        "description": "1. Stelle dich etwa einen Meter vor deinen Schreibtisch.\n2. Lege beide Hände schulterbreit auf die Tischkante.\n3. Halte deinen Körper gerade von Kopf bis Fuß.\n4. Beuge die Arme und senke deinen Oberkörper zum Tisch.\n5. Drücke dich zurück in die Ausgangsposition.\n6. Wiederhole 3 Sätze à 10-15 Wiederholungen.\n\nVorteile: Stärkt Brust, Schultern und Arme, löst Verspannungen im Oberkörper.",
        "duration_minutes": 4,
        "prompt": "Simple illustration of a person doing desk push-ups against a table, side view, clean minimalist style, educational diagram, light background"
    },
    {
        "title": "Kniebeugen",
        "description": "1. Stehe mit Füßen schulterbreit auseinander.\n2. Strecke deine Arme nach vorne für Balance.\n3. Senke deinen Körper, als würdest du dich setzen.\n4. Halte die Knie hinter den Zehenspitzen.\n5. Drücke dich durch die Fersen zurück nach oben.\n6. Wiederhole 3 Sätze à 12-15 Wiederholungen.\n\nVorteile: Aktiviert große Muskelgruppen, verbessert die Durchblutung der Beine, steigert die Konzentration.",
        "duration_minutes": 5,
        "prompt": "Simple illustration of a person doing squats, side view showing proper form, clean minimalist style, educational diagram, light background"
    },
    {
        "title": "Nacken- und Schulterkreisen",
        "description": "1. Setze dich aufrecht hin oder stehe gerade.\n2. Lasse deine Schultern entspannt hängen.\n3. Kreise langsam mit den Schultern nach hinten (10 Mal).\n4. Kreise langsam mit den Schultern nach vorne (10 Mal).\n5. Neige den Kopf sanft zur rechten Seite (10 Sekunden halten).\n6. Neige den Kopf sanft zur linken Seite (10 Sekunden halten).\n7. Wiederhole 2-3 Mal.\n\nVorteile: Löst Verspannungen im Nacken, verbessert die Beweglichkeit, reduziert Kopfschmerzen.",
        "duration_minutes": 4,
        "prompt": "Simple illustration of a person doing neck and shoulder circles, front view, clean minimalist style, educational diagram showing movement arrows, light background"
    },
    {
        "title": "Ausfallschritte",
        "description": "1. Stehe aufrecht mit Händen an den Hüften.\n2. Mache einen großen Schritt nach vorne mit dem rechten Fuß.\n3. Senke deinen Körper, bis beide Knie 90-Grad-Winkel bilden.\n4. Drücke dich mit dem vorderen Fuß zurück zur Ausgangsposition.\n5. Wechsle das Bein.\n6. Wiederhole 10 Ausfallschritte pro Bein (3 Sätze).\n\nVorteile: Kräftigt Beine und Po, verbessert Balance und Koordination.",
        "duration_minutes": 5,
        "prompt": "Simple illustration of a person doing forward lunges, side view showing proper form, clean minimalist style, educational diagram, light background"
    }
]

RELAXED_EXERCISES = [
    {
        "title": "4-7-8 Atemtechnik",
        "description": "1. Setze dich bequem hin mit geradem Rücken.\n2. Lege die Zungenspitze hinter die oberen Schneidezähne.\n3. Atme vollständig durch den Mund aus.\n4. Schließe den Mund und atme leise durch die Nase ein - zähle dabei bis 4.\n5. Halte den Atem an und zähle bis 7.\n6. Atme vollständig durch den Mund aus und zähle dabei bis 8.\n7. Dies ist ein Atemzyklus. Wiederhole 4-8 Zyklen.\n\nVorteile: Reduziert Stress und Angst, verbessert die Sauerstoffversorgung, fördert die Entspannung.",
        "duration_minutes": 5,
        "prompt": "Simple illustration of a person sitting in meditation posture doing breathing exercises, side view, calm peaceful expression, clean minimalist style, light background"
    },
    {
        "title": "Progressive Muskelentspannung",
        "description": "1. Setze oder lege dich bequem hin.\n2. Beginne mit den Füßen: Spanne die Muskeln für 5 Sekunden an.\n3. Entspanne die Muskeln vollständig für 10 Sekunden.\n4. Arbeite dich nach oben: Waden, Oberschenkel, Bauch, Arme.\n5. Spanne jeweils eine Muskelgruppe an und entspanne sie bewusst.\n6. Achte auf den Unterschied zwischen Anspannung und Entspannung.\n7. Schließe mit tiefen Atemzügen ab.\n\nVorteile: Löst körperliche Verspannungen, reduziert Stress, verbessert Körperbewusstsein.",
        "duration_minutes": 7,
        "prompt": "Simple illustration of a person lying down relaxed doing progressive muscle relaxation, peaceful setting, clean minimalist style, light background"
    },
    {
        "title": "Achtsamkeitsmeditation",
        "description": "1. Setze dich bequem hin und schließe die Augen.\n2. Richte deine Aufmerksamkeit auf deinen Atem.\n3. Beobachte, wie der Atem ein- und ausströmt.\n4. Wenn Gedanken auftauchen, nimm sie wahr ohne zu urteilen.\n5. Kehre sanft zum Atem zurück.\n6. Spüre den gegenwärtigen Moment.\n7. Praktiziere für 5-7 Minuten.\n\nVorteile: Verbessert Konzentration und Fokus, reduziert mentalen Stress, erhöht die Selbstwahrnehmung.",
        "duration_minutes": 6,
        "prompt": "Simple illustration of a person sitting cross-legged in meditation, peaceful expression, minimal background, clean educational style, soft lighting"
    },
    {
        "title": "Augen-Entspannungsübung (Palming)",
        "description": "1. Setze dich aufrecht hin und reibe deine Handflächen aneinander.\n2. Schließe die Augen.\n3. Lege die warmen Handflächen sanft über die geschlossenen Augen.\n4. Achte darauf, keinen Druck auf die Augäpfel auszuüben.\n5. Atme ruhig und gleichmäßig.\n6. Visualisiere Dunkelheit oder eine beruhigende Szene.\n7. Halte für 2-3 Minuten.\n8. Öffne langsam die Hände und dann die Augen.\n\nVorteile: Entspannt die Augenmuskulatur, reduziert Bildschirmermüdung, verbessert die Durchblutung der Augen.",
        "duration_minutes": 3,
        "prompt": "Simple illustration of a person doing eye palming exercise, covering eyes with warm hands, peaceful expression, clean minimalist style, light background"
    },
    {
        "title": "Body Scan Meditation",
        "description": "1. Lege dich bequem auf den Rücken oder setze dich entspannt hin.\n2. Schließe die Augen und atme tief ein und aus.\n3. Richte deine Aufmerksamkeit auf deine Füße.\n4. Spüre alle Empfindungen in den Füßen für 30 Sekunden.\n5. Bewege deine Aufmerksamkeit langsam nach oben: Beine, Becken, Bauch.\n6. Fahre fort durch den ganzen Körper bis zum Kopf.\n7. Nimm Verspannungen wahr und atme bewusst in diese Bereiche.\n8. Beende mit einigen tiefen Atemzügen.\n\nVorteile: Erhöht Körperbewusstsein, reduziert physischen Stress, verbessert die Schlafqualität.",
        "duration_minutes": 7,
        "prompt": "Simple illustration of a person lying down doing body scan meditation, relaxed posture, peaceful setting, clean minimalist style, light background"
    }
]

async def generate_exercises():
    """Generate exercises with AI images and store in database."""
    
    # Connect to MongoDB
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    # Initialize image generator
    image_gen = OpenAIImageGeneration(api_key=os.environ.get('EMERGENT_LLM_KEY'))
    
    print("Starting exercise generation...")
    print("=" * 50)
    
    # Check if exercises already exist
    existing_count = await db.exercises.count_documents({})
    if existing_count > 0:
        print(f"Found {existing_count} existing exercises.")
        response = input("Do you want to delete and regenerate? (yes/no): ")
        if response.lower() == 'yes':
            await db.exercises.delete_many({})
            print("Deleted existing exercises.")
        else:
            print("Keeping existing exercises. Exiting...")
            client.close()
            return
    
    # Generate active exercises
    print("\nGenerating ACTIVE exercises...")
    for idx, exercise in enumerate(ACTIVE_EXERCISES, 1):
        print(f"\n[{idx}/{len(ACTIVE_EXERCISES)}] Generating: {exercise['title']}")
        
        try:
            # Generate image
            print(f"  → Generating image...")
            images = await image_gen.generate_images(
                prompt=exercise['prompt'],
                model="gpt-image-1",
                number_of_images=1
            )
            
            if images and len(images) > 0:
                image_base64 = base64.b64encode(images[0]).decode('utf-8')
                image_url = f"data:image/png;base64,{image_base64}"
                print(f"  ✓ Image generated successfully")
            else:
                image_url = None
                print(f"  ✗ No image generated")
        except Exception as e:
            print(f"  ✗ Error generating image: {str(e)}")
            image_url = None
        
        # Create exercise document
        exercise_doc = {
            "id": str(uuid.uuid4()),
            "category": "active",
            "title": exercise['title'],
            "description": exercise['description'],
            "duration_minutes": exercise['duration_minutes'],
            "image_url": image_url,
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        
        await db.exercises.insert_one(exercise_doc)
        print(f"  ✓ Exercise saved to database")
    
    # Generate relaxed exercises
    print("\n" + "=" * 50)
    print("Generating RELAXED exercises...")
    for idx, exercise in enumerate(RELAXED_EXERCISES, 1):
        print(f"\n[{idx}/{len(RELAXED_EXERCISES)}] Generating: {exercise['title']}")
        
        try:
            # Generate image
            print(f"  → Generating image...")
            images = await image_gen.generate_images(
                prompt=exercise['prompt'],
                model="gpt-image-1",
                number_of_images=1
            )
            
            if images and len(images) > 0:
                image_base64 = base64.b64encode(images[0]).decode('utf-8')
                image_url = f"data:image/png;base64,{image_base64}"
                print(f"  ✓ Image generated successfully")
            else:
                image_url = None
                print(f"  ✗ No image generated")
        except Exception as e:
            print(f"  ✗ Error generating image: {str(e)}")
            image_url = None
        
        # Create exercise document
        exercise_doc = {
            "id": str(uuid.uuid4()),
            "category": "relaxed",
            "title": exercise['title'],
            "description": exercise['description'],
            "duration_minutes": exercise['duration_minutes'],
            "image_url": image_url,
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        
        await db.exercises.insert_one(exercise_doc)
        print(f"  ✓ Exercise saved to database")
    
    print("\n" + "=" * 50)
    print("Exercise generation complete!")
    
    # Print summary
    total_active = await db.exercises.count_documents({"category": "active"})
    total_relaxed = await db.exercises.count_documents({"category": "relaxed"})
    print(f"\nSummary:")
    print(f"  Active exercises: {total_active}")
    print(f"  Relaxed exercises: {total_relaxed}")
    print(f"  Total: {total_active + total_relaxed}")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(generate_exercises())
