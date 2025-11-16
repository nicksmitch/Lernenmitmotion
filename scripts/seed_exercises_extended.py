"""
Extended exercise seeding with individual and teacher/group exercises.
Minimum 6 active + 6 relaxed for individuals, plus group/partner exercises for teachers.
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
import uuid

env_path = Path(__file__).parent.parent / 'backend' / '.env'
load_dotenv(env_path)

mongo_url = os.environ['MONGO_URL']
db_name = os.environ['DB_NAME']

# INDIVIDUAL ACTIVE EXERCISES (minimum 6)
INDIVIDUAL_ACTIVE = [
    {
        "title": "Jumping Jacks",
        "description": "1. Stehe aufrecht mit Füßen zusammen und Armen an den Seiten.\n2. Springe und spreize gleichzeitig deine Beine schulterbreit.\n3. Hebe gleichzeitig deine Arme über den Kopf.\n4. Springe zurück in die Ausgangsposition.\n5. Wiederhole für 3 Minuten in einem angenehmen Tempo.\n\nVorteile: Aktiviert den Kreislauf, verbessert die Durchblutung und steigert die Energie.",
        "duration_minutes": 3,
        "prompt": "Simple illustration of a person doing jumping jacks exercise, side view, clean minimalist style, educational diagram, light background"
    },
    {
        "title": "Schreibtisch-Liegestütze",
        "description": "1. Stelle dich etwa einen Meter vor deinen Schreibtisch.\n2. Lege beide Hände schulterbreit auf die Tischkante.\n3. Halte deinen Körper gerade von Kopf bis Fuß.\n4. Beuge die Arme und senke deinen Oberkörper zum Tisch.\n5. Drücke dich zurück in die Ausgangsposition.\n6. Wiederhole 3 Sätze à 10-15 Wiederholungen.\n\nVorteile: Stärkt Brust, Schultern und Arme, löst Verspannungen im Oberkörper.",
        "duration_minutes": 4,
        "prompt": "Simple illustration of a person doing desk push-ups, side view, clean minimalist style, educational diagram"
    },
    {
        "title": "Kniebeugen",
        "description": "1. Stehe mit Füßen schulterbreit auseinander.\n2. Strecke deine Arme nach vorne für Balance.\n3. Senke deinen Körper, als würdest du dich setzen.\n4. Halte die Knie hinter den Zehenspitzen.\n5. Drücke dich durch die Fersen zurück nach oben.\n6. Wiederhole 3 Sätze à 12-15 Wiederholungen.\n\nVorteile: Aktiviert große Muskelgruppen, verbessert die Durchblutung der Beine.",
        "duration_minutes": 5,
        "prompt": "Simple illustration of person doing squats, proper form, clean style, educational diagram"
    },
    {
        "title": "Nacken- und Schulterkreisen",
        "description": "1. Setze dich aufrecht hin oder stehe gerade.\n2. Lasse deine Schultern entspannt hängen.\n3. Kreise langsam mit den Schultern nach hinten (10 Mal).\n4. Kreise langsam mit den Schultern nach vorne (10 Mal).\n5. Neige den Kopf sanft zur rechten Seite (10 Sekunden halten).\n6. Neige den Kopf sanft zur linken Seite (10 Sekunden halten).\n7. Wiederhole 2-3 Mal.\n\nVorteile: Löst Verspannungen im Nacken, verbessert die Beweglichkeit.",
        "duration_minutes": 4,
        "prompt": "Simple illustration of person doing neck and shoulder rolls, movement arrows, clean style"
    },
    {
        "title": "Ausfallschritte",
        "description": "1. Stehe aufrecht mit Händen an den Hüften.\n2. Mache einen großen Schritt nach vorne mit dem rechten Fuß.\n3. Senke deinen Körper, bis beide Knie 90-Grad-Winkel bilden.\n4. Drücke dich mit dem vorderen Fuß zurück zur Ausgangsposition.\n5. Wechsle das Bein.\n6. Wiederhole 10 Ausfallschritte pro Bein (3 Sätze).\n\nVorteile: Kräftigt Beine und Po, verbessert Balance und Koordination.",
        "duration_minutes": 5,
        "prompt": "Simple illustration of person doing lunges, proper form, side view, educational style"
    },
    {
        "title": "Hampelmann-Variationen",
        "description": "1. Beginne mit klassischen Jumping Jacks (30 Sekunden).\n2. Wechsle zu Seitenschritten mit Armschwung (30 Sekunden).\n3. Mache Kreuz-Jumping-Jacks - kreuze Arme und Beine (30 Sekunden).\n4. Halte Position und atme tief (15 Sekunden).\n5. Wiederhole den ganzen Zyklus 3-4 Mal.\n\nVorteile: Ganzkörper-Aktivierung, verbessert Koordination und Ausdauer.",
        "duration_minutes": 4,
        "prompt": "Simple illustration of person doing jumping jack variations, multiple poses, educational diagram"
    },
    {
        "title": "Wandsitzen",
        "description": "1. Stelle dich mit dem Rücken zur Wand.\n2. Rutsche nach unten, bis deine Oberschenkel parallel zum Boden sind.\n3. Halte die Position für 30 Sekunden.\n4. Stehe auf und schüttle die Beine aus (15 Sekunden).\n5. Wiederhole 4-5 Mal.\n6. Steigere die Haltezeit mit der Zeit auf bis zu 60 Sekunden.\n\nVorteile: Stärkt Beinmuskulatur und Ausdauer, verbessert mentale Stärke.",
        "duration_minutes": 5,
        "prompt": "Simple illustration of person doing wall sit exercise, side view, proper form, educational style"
    }
]

# INDIVIDUAL RELAXED EXERCISES (minimum 6)
INDIVIDUAL_RELAXED = [
    {
        "title": "4-7-8 Atemtechnik",
        "description": "1. Setze dich bequem hin mit geradem Rücken.\n2. Lege die Zungenspitze hinter die oberen Schneidezähne.\n3. Atme vollständig durch den Mund aus.\n4. Schließe den Mund und atme leise durch die Nase ein - zähle dabei bis 4.\n5. Halte den Atem an und zähle bis 7.\n6. Atme vollständig durch den Mund aus und zähle dabei bis 8.\n7. Dies ist ein Atemzyklus. Wiederhole 4-8 Zyklen.\n\nVorteile: Reduziert Stress und Angst, verbessert die Sauerstoffversorgung.",
        "duration_minutes": 5,
        "prompt": "Simple illustration of person doing breathing exercise, peaceful meditation pose, clean style"
    },
    {
        "title": "Progressive Muskelentspannung",
        "description": "1. Setze oder lege dich bequem hin.\n2. Beginne mit den Füßen: Spanne die Muskeln für 5 Sekunden an.\n3. Entspanne die Muskeln vollständig für 10 Sekunden.\n4. Arbeite dich nach oben: Waden, Oberschenkel, Bauch, Arme.\n5. Spanne jeweils eine Muskelgruppe an und entspanne sie bewusst.\n6. Achte auf den Unterschied zwischen Anspannung und Entspannung.\n7. Schließe mit tiefen Atemzügen ab.\n\nVorteile: Löst körperliche Verspannungen, reduziert Stress.",
        "duration_minutes": 7,
        "prompt": "Simple illustration of person lying down relaxed, progressive muscle relaxation, peaceful setting"
    },
    {
        "title": "Achtsamkeitsmeditation",
        "description": "1. Setze dich bequem hin und schließe die Augen.\n2. Richte deine Aufmerksamkeit auf deinen Atem.\n3. Beobachte, wie der Atem ein- und ausströmt.\n4. Wenn Gedanken auftauchen, nimm sie wahr ohne zu urteilen.\n5. Kehre sanft zum Atem zurück.\n6. Spüre den gegenwärtigen Moment.\n7. Praktiziere für 5-7 Minuten.\n\nVorteile: Verbessert Konzentration und Fokus, reduziert mentalen Stress.",
        "duration_minutes": 6,
        "prompt": "Simple illustration of person in meditation, cross-legged, peaceful expression, minimal background"
    },
    {
        "title": "Augen-Entspannung (Palming)",
        "description": "1. Setze dich aufrecht hin und reibe deine Handflächen aneinander.\n2. Schließe die Augen.\n3. Lege die warmen Handflächen sanft über die geschlossenen Augen.\n4. Achte darauf, keinen Druck auf die Augäpfel auszuüben.\n5. Atme ruhig und gleichmäßig.\n6. Visualisiere Dunkelheit oder eine beruhigende Szene.\n7. Halte für 2-3 Minuten.\n\nVorteile: Entspannt die Augenmuskulatur, reduziert Bildschirmermüdung.",
        "duration_minutes": 3,
        "prompt": "Simple illustration of person doing eye palming, covering eyes with hands, peaceful"
    },
    {
        "title": "Body Scan Meditation",
        "description": "1. Lege dich bequem auf den Rücken oder setze dich entspannt hin.\n2. Schließe die Augen und atme tief ein und aus.\n3. Richte deine Aufmerksamkeit auf deine Füße.\n4. Spüre alle Empfindungen in den Füßen für 30 Sekunden.\n5. Bewege deine Aufmerksamkeit langsam nach oben: Beine, Becken, Bauch.\n6. Fahre fort durch den ganzen Körper bis zum Kopf.\n7. Nimm Verspannungen wahr und atme bewusst in diese Bereiche.\n\nVorteile: Erhöht Körperbewusstsein, reduziert physischen Stress.",
        "duration_minutes": 7,
        "prompt": "Simple illustration of person lying down for body scan meditation, relaxed posture"
    },
    {
        "title": "Geführte Fantasiereise",
        "description": "1. Setze oder lege dich bequem hin, schließe die Augen.\n2. Stelle dir einen friedlichen Ort vor (Strand, Wald, Wiese).\n3. Visualisiere alle Details: Farben, Geräusche, Gerüche.\n4. Spüre die Ruhe und Geborgenheit dieses Ortes.\n5. Atme die friedliche Atmosphäre ein.\n6. Bleibe 5-6 Minuten an diesem Ort.\n7. Kehre langsam zurück, öffne die Augen.\n\nVorteile: Reduziert Stress, fördert Kreativität und positive Emotionen.",
        "duration_minutes": 6,
        "prompt": "Simple illustration of person in peaceful visualization, dreaming of nature scene, serene"
    },
    {
        "title": "Dankbarkeitsübung",
        "description": "1. Setze dich bequem hin und schließe die Augen.\n2. Atme einige Male tief ein und aus.\n3. Denke an drei Dinge, für die du heute dankbar bist.\n4. Spüre das Gefühl der Dankbarkeit in deinem Herzen.\n5. Lächle sanft und atme dieses positive Gefühl ein.\n6. Lasse das Gefühl durch deinen ganzen Körper fließen.\n7. Praktiziere für 4-5 Minuten.\n\nVorteile: Verbessert Stimmung, reduziert Stress, fördert positives Denken.",
        "duration_minutes": 5,
        "prompt": "Simple illustration of person in grateful meditation, gentle smile, heart-centered, peaceful"
    }
]

# TEACHER GROUP/PARTNER EXERCISES - ACTIVE
TEACHER_ACTIVE = [
    {
        "title": "Partner-Koordinationsspiel",
        "description": "**Für 2-4 Personen**\n\n1. Bildet Paare und stellt euch gegenüber.\n2. Eine Person führt, die andere spiegelt die Bewegungen.\n3. Macht langsame Armbewegungen (1 Minute).\n4. Wechselt die Rollen.\n5. Steigert das Tempo langsam.\n6. Fügt Beinbewegungen hinzu.\n\nVorteile: Verbessert Koordination, Konzentration und Teamwork.",
        "duration_minutes": 4,
        "is_group": True,
        "prompt": "Simple illustration of two people doing mirror exercise, facing each other, coordination activity"
    },
    {
        "title": "Gordischer Knoten",
        "description": "**Für 6-12 Personen**\n\n1. Alle stehen im Kreis, eng beieinander.\n2. Streckt eure rechte Hand aus und greift eine andere Hand (nicht die direkt neben euch).\n3. Streckt eure linke Hand aus und greift eine andere Hand.\n4. Ohne Hände loszulassen, versucht den Knoten zu entwirren.\n5. Kommuniziert und arbeitet zusammen.\n6. Ziel: Ein Kreis oder zwei verschlungene Kreise.\n\nVorteile: Teamwork, Problemlösung, körperliche Aktivierung.",
        "duration_minutes": 6,
        "is_group": True,
        "prompt": "Simple illustration of group of people holding hands in tangled formation, team building game"
    },
    {
        "title": "Rücken an Rücken aufstehen",
        "description": "**Für 2 Personen (oder Gruppen)**\n\n1. Setzt euch Rücken an Rücken auf den Boden.\n2. Verhakt eure Arme ineinander.\n3. Drückt eure Rücken gegeneinander.\n4. Versucht gemeinsam aufzustehen ohne die Arme zu lösen.\n5. Setzt euch wieder hin und wiederholt.\n6. Steigert die Geschwindigkeit.\n\nVorteile: Stärkt Beinmuskulatur, fördert Vertrauen und Zusammenarbeit.",
        "duration_minutes": 4,
        "is_group": True,
        "prompt": "Simple illustration of two people sitting back to back standing up together, partner exercise"
    },
    {
        "title": "Gruppen-Plank Challenge",
        "description": "**Für ganze Klasse**\n\n1. Alle gehen in die Plank-Position (Unterarmstütz).\n2. Haltet gemeinsam für 20 Sekunden.\n3. Kurze Pause (10 Sekunden).\n4. Nächste Runde: 25 Sekunden.\n5. Motiviert euch gegenseitig.\n6. Steigert die Zeit mit jeder Runde.\n\nVorteile: Stärkt Körpermitte, fördert Durchhaltevermögen und Gruppenmotivation.",
        "duration_minutes": 5,
        "is_group": True,
        "prompt": "Simple illustration of multiple people doing plank position together, group exercise, supportive"
    },
    {
        "title": "Menschen-Knoten Bewegungsspiel",
        "description": "**Für 8-15 Personen**\n\n1. Bildet einen engen Kreis.\n2. Jeder streckt beide Hände zur Mitte und greift zwei verschiedene Hände.\n3. Ohne loszulassen, bewegt euch und versucht den Knoten zu lösen.\n4. Kommuniziert laut und klar.\n5. Duckt euch, steigt über Arme, dreht euch.\n6. Ziel: Einen großen Kreis bilden.\n\nVorteile: Ganzkörper-Bewegung, Teamwork, Problemlösung, viel Spaß.",
        "duration_minutes": 6,
        "is_group": True,
        "prompt": "Simple illustration of group forming human knot, people connected holding hands, playful"
    },
    {
        "title": "Partner-Yoga: Baum",
        "description": "**Für 2 Personen**\n\n1. Stellt euch nebeneinander, etwa 30 cm Abstand.\n2. Legt die inneren Arme um die Schultern des Partners.\n3. Hebt beide das äußere Bein und legt den Fuß an den inneren Oberschenkel.\n4. Findet gemeinsam die Balance.\n5. Haltet 30 Sekunden.\n6. Wechselt die Seiten.\n\nVorteile: Verbessert Balance, Konzentration und Vertrauen.",
        "duration_minutes": 5,
        "is_group": True,
        "prompt": "Simple illustration of two people doing tree pose together in partner yoga, balanced"
    }
]

# TEACHER GROUP/PARTNER EXERCISES - RELAXED
TEACHER_RELAXED = [
    {
        "title": "Gruppen-Atemkreis",
        "description": "**Für ganze Klasse**\n\n1. Bildet einen großen Kreis, alle stehen.\n2. Gemeinsam tief einatmen (4 Sekunden), Arme nach oben.\n3. Atem anhalten (2 Sekunden).\n4. Gemeinsam ausatmen (6 Sekunden), Arme nach unten.\n5. Spürt die gemeinsame Energie.\n6. Wiederhole 8-10 Zyklen.\n\nVorteile: Synchronisiert Energie, beruhigt die Gruppe, fördert Gemeinschaftsgefühl.",
        "duration_minutes": 5,
        "is_group": True,
        "prompt": "Simple illustration of group in circle doing breathing exercise together, synchronized, peaceful"
    },
    {
        "title": "Stille Minute Challenge",
        "description": "**Für ganze Klasse**\n\n1. Alle setzen oder stehen bequem.\n2. Schließt die Augen.\n3. Eine Minute absolute Stille - keine Bewegung, kein Geräusch.\n4. Konzentriert euch nur auf euren Atem.\n5. Öffnet nach der Minute langsam die Augen.\n6. Wer hat es geschafft?\n\nVorteile: Fördert Selbstkontrolle, Konzentration und innere Ruhe.",
        "duration_minutes": 3,
        "is_group": True,
        "prompt": "Simple illustration of classroom with students in silent meditation, peaceful, calm atmosphere"
    },
    {
        "title": "Partner-Rückenmassage",
        "description": "**Für Paare oder Reihen**\n\n1. Eine Person sitzt, der Partner steht dahinter.\n2. Sanfte Kreisbewegungen auf den Schultern (1 Minute).\n3. Leichter Druck entlang der Wirbelsäule (1 Minute).\n4. Sanftes Klopfen auf dem oberen Rücken (30 Sekunden).\n5. Rollenwechsel.\n6. Feedback geben: Was war angenehm?\n\nVorteile: Löst Verspannungen, fördert soziale Bindung und Entspannung.",
        "duration_minutes": 6,
        "is_group": True,
        "prompt": "Simple illustration of two people, one giving shoulder massage to other, gentle, caring"
    },
    {
        "title": "Geführte Gruppen-Fantasiereise",
        "description": "**Für ganze Klasse - Lehrkraft liest vor**\n\n1. Alle legen Kopf auf den Tisch oder setzen sich zurück.\n2. Augen schließen.\n3. Lehrkraft beschreibt einen ruhigen Ort (Wald, Strand).\n4. Details: Geräusche, Gerüche, Temperatur.\n5. Alle visualisieren gemeinsam.\n6. Langsam zurückkehren.\n\nVorteile: Gemeinsame Entspannung, fördert Vorstellungskraft, reduziert Stress.",
        "duration_minutes": 7,
        "is_group": True,
        "prompt": "Simple illustration of classroom with students relaxed, heads down, peaceful guided meditation"
    },
    {
        "title": "Klangschalen-Meditation",
        "description": "**Für ganze Klasse (benötigt Klangschale oder ähnliches)**\n\n1. Alle sitzen bequem mit geschlossenen Augen.\n2. Lehrkraft schlägt Klangschale an.\n3. Konzentriert euch auf den Klang.\n4. Folgt dem Klang, bis er verstummt.\n5. Wiederhole 5-6 Mal mit Pausen.\n6. Spürt die Stille zwischen den Klängen.\n\nVorteile: Fördert Konzentration, tiefe Entspannung und Achtsamkeit.",
        "duration_minutes": 6,
        "is_group": True,
        "prompt": "Simple illustration of singing bowl meditation in classroom setting, peaceful, focused students"
    }
]

async def generate_all_exercises():
    """Generate all exercises with images."""
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    # Check and delete existing
    existing_count = await db.exercises.count_documents({})
    if existing_count > 0:
        print(f"Lösche {existing_count} bestehende Übungen...")
        await db.exercises.delete_many({})
    
    image_gen = OpenAIImageGeneration(api_key=os.environ.get('EMERGENT_LLM_KEY'))
    
    print("=" * 60)
    print("GENERIERE ÜBUNGEN FÜR EINZELNUTZER UND LEHRKRÄFTE")
    print("=" * 60)
    
    # Generate individual active
    print(f"\n[AKTIV - EINZELNUTZER] {len(INDIVIDUAL_ACTIVE)} Übungen")
    for idx, ex in enumerate(INDIVIDUAL_ACTIVE, 1):
        print(f"  [{idx}/{len(INDIVIDUAL_ACTIVE)}] {ex['title']}")
        image_url = await generate_image(image_gen, ex['prompt'])
        await save_exercise(db, "active", ex, ["individual", "teacher"], False, image_url)
    
    # Generate individual relaxed
    print(f"\n[ENTSPANNUNG - EINZELNUTZER] {len(INDIVIDUAL_RELAXED)} Übungen")
    for idx, ex in enumerate(INDIVIDUAL_RELAXED, 1):
        print(f"  [{idx}/{len(INDIVIDUAL_RELAXED)}] {ex['title']}")
        image_url = await generate_image(image_gen, ex['prompt'])
        await save_exercise(db, "relaxed", ex, ["individual", "teacher"], False, image_url)
    
    # Generate teacher active
    print(f"\n[AKTIV - GRUPPEN/PARTNER] {len(TEACHER_ACTIVE)} Übungen")
    for idx, ex in enumerate(TEACHER_ACTIVE, 1):
        print(f"  [{idx}/{len(TEACHER_ACTIVE)}] {ex['title']}")
        image_url = await generate_image(image_gen, ex['prompt'])
        await save_exercise(db, "active", ex, ["teacher"], True, image_url)
    
    # Generate teacher relaxed
    print(f"\n[ENTSPANNUNG - GRUPPEN] {len(TEACHER_RELAXED)} Übungen")
    for idx, ex in enumerate(TEACHER_RELAXED, 1):
        print(f"  [{idx}/{len(TEACHER_RELAXED)}] {ex['title']}")
        image_url = await generate_image(image_gen, ex['prompt'])
        await save_exercise(db, "relaxed", ex, ["teacher"], True, image_url)
    
    # Summary
    print("\n" + "=" * 60)
    total_individual_active = await db.exercises.count_documents({"category": "active", "roles": "individual"})
    total_individual_relaxed = await db.exercises.count_documents({"category": "relaxed", "roles": "individual"})
    total_teacher_active = await db.exercises.count_documents({"category": "active", "is_group_exercise": True})
    total_teacher_relaxed = await db.exercises.count_documents({"category": "relaxed", "is_group_exercise": True})
    
    print("ZUSAMMENFASSUNG:")
    print(f"  Einzelnutzer Aktiv: {total_individual_active}")
    print(f"  Einzelnutzer Entspannung: {total_individual_relaxed}")
    print(f"  Lehrkräfte Gruppen Aktiv: {total_teacher_active}")
    print(f"  Lehrkräfte Gruppen Entspannung: {total_teacher_relaxed}")
    print(f"  GESAMT: {total_individual_active + total_individual_relaxed + total_teacher_active + total_teacher_relaxed}")
    print("=" * 60)
    
    client.close()

async def generate_image(image_gen, prompt):
    """Generate image for exercise."""
    try:
        images = await image_gen.generate_images(prompt=prompt, model="gpt-image-1", number_of_images=1)
        if images and len(images) > 0:
            return f"data:image/png;base64,{base64.b64encode(images[0]).decode('utf-8')}"
    except Exception as e:
        print(f"    ⚠ Fehler: {str(e)}")
    return None

async def save_exercise(db, category, ex, roles, is_group, image_url):
    """Save exercise to database."""
    doc = {
        "id": str(uuid.uuid4()),
        "category": category,
        "title": ex['title'],
        "description": ex['description'],
        "duration_minutes": ex['duration_minutes'],
        "image_url": image_url,
        "roles": roles,
        "is_group_exercise": is_group,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.exercises.insert_one(doc)
    print(f"    ✓ Gespeichert")

if __name__ == "__main__":
    asyncio.run(generate_all_exercises())
