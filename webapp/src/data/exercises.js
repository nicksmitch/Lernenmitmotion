// All exercises data for FocusFlow
export const exercises = [
  // INDIVIDUAL ACTIVE EXERCISES
  {
    id: '1',
    category: 'active',
    title: 'Jumping Jacks',
    description: '1. Tanze 3 mal hin und Her und kack dir auf die Füße Stehe aufrecht mit Füßen zusammen und Armen an den Seiten.\n2. Springe und spreize gleichzeitig deine Beine schulterbreit.\n3. Hebe gleichzeitig deine Arme über den Kopf.\n4. Springe zurück in die Ausgangsposition.\n5. Wiederhole für 3 Minuten in einem angenehmen Tempo.\n\nVorteile: Aktiviert den Kreislauf, verbessert die Durchblutung und steigert die Energie.',
    duration_minutes: 3,
    roles: ['individual', 'teacher'],
    is_group_exercise: false
  },

  // INDIVIDUAL RELAXED EXERCISES
  {
    id: '11',
    category: 'relaxed',
    title: '4-7-8 Atemtechnik',
    description: '1. Setze dich bequem hin mit geradem Rücken.\n2. Lege die Zungenspitze hinter die oberen Schneidezähne.\n3. Atme vollständig durch den Mund aus.\n4. Schließe den Mund und atme leise durch die Nase ein - zähle dabei bis 4.\n5. Halte den Atem an und zähle bis 7.\n6. Atme vollständig durch den Mund aus und zähle dabei bis 8.\n7. Dies ist ein Atemzyklus. Wiederhole 4-8 Zyklen.\n\nVorteile: Reduziert Stress und Angst, verbessert die Sauerstoffversorgung.',
    duration_minutes: 5,
    roles: ['individual', 'teacher'],
    is_group_exercise: false
  },

  // INDIVIDUAL RELAXED EXERCISES (Extended)
  {
    id: '14a',
    category: 'relaxed',
    title: 'Box Breathing (4-4-4-4)',
    description: '1. Setze dich bequem und schließe die Augen.\n2. Atme 4 Sekunden ein durch die Nase.\n3. Halte den Atem 4 Sekunden an.\n4. Atme 4 Sekunden aus durch den Mund.\n5. Halte 4 Sekunden mit leerer Lunge.\n6. Dies ist ein Zyklus.\n7. Wiederhole für 5-6 Minuten.\n\nVorteile: Beruhigt Nervensystem, reduziert Stress, verbessert Fokus.',
    duration_minutes: 6,
    roles: ['individual', 'teacher'],
    is_group_exercise: false
  },

  // TEACHER GROUP EXERCISES - ACTIVE
  {
    id: '21',
    category: 'active',
    title: 'Partner-Koordinationsspiel',
    description: 'Für 2-4 Personen\n\n1. Bildet Paare und stellt euch gegenüber.\n2. Eine Person führt, die andere spiegelt die Bewegungen.\n3. Macht langsame Armbewegungen (1 Minute).\n4. Wechselt die Rollen.\n5. Steigert das Tempo langsam.\n6. Fügt Beinbewegungen hinzu.\n\nVorteile: Verbessert Koordination, Konzentration und Teamwork.',
    duration_minutes: 4,
    roles: ['teacher'],
    is_group_exercise: true
  },

  // TEACHER GROUP EXERCISES - RELAXED
  {
    id: '31',
    category: 'relaxed',
    title: 'Gruppen-Atemkreis',
    description: 'Für ganze Klasse\n\n1. Bildet einen großen Kreis, alle stehen.\n2. Gemeinsam tief einatmen (4 Sekunden), Arme nach oben.\n3. Atem anhalten (2 Sekunden).\n4. Gemeinsam ausatmen (6 Sekunden), Arme nach unten.\n5. Spürt die gemeinsame Energie.\n6. Wiederhole 8-10 Zyklen.\n\nVorteile: Synchronisiert Energie, beruhigt die Gruppe, fördert Gemeinschaftsgefühl.',
    duration_minutes: 5,
    roles: ['teacher'],
    is_group_exercise: true
  },
    
  // Additional INDIVIDUAL exercises for variety
  {
    id: '14b',
    category: 'active',
    title: 'Wand-Sit (Wandsitzen)',
    description: '1. Stelle dich mit dem Rücken zur Wand.\n2. Rutsche mit dem Rücken an der Wand herunter.\n3. Beuge die Knie auf 90 Grad (wie auf einem Stuhl sitzend).\n4. Halte die Position 20-30 Sekunden.\n5. Pause 30 Sekunden.\n6. Wiederhole 3-4 Durchgänge.\n7. Steigere die Haltezeit langsam.\n\nVorteile: Stärkt Oberschenkelmuskulatur, Kraftausdauer.',
    duration_minutes: 4,
    roles: ['individual', 'teacher'],
    is_group_exercise: false
  },
  
  // More GROUP ACTIVE exercises
  {
    id: '35a',
    category: 'active',
    title: 'Stopptanz',
    description: 'Für ganze Klasse\n\n1. Musik läuft, alle tanzen frei im Raum.\n2. Musik stoppt - alle frieren sofort ein.\n3. Haltet die Position wie Statuen.\n4. Wer sich bewegt, macht 3 Jumping Jacks.\n5. Musik startet wieder - weiter tanzen.\n6. 5-6 Runden spielen.\n7. Verschiedene Musikstile ausprobieren.\n\nVorteile: Bewegung, Reaktion, Körperkontrolle, Spaß.',
    duration_minutes: 6,
    roles: ['teacher'],
    is_group_exercise: true
  },
];

// Get exercises by category and role
export function getExercisesByRole(category, userRole = 'individual') {
  return exercises.filter(ex => 
    ex.category === category && 
    ex.roles.includes(userRole)
  );
}

// Get random exercise
export function getRandomExercise(category, userRole = 'individual') {
  const filtered = getExercisesByRole(category, userRole);
  if (filtered.length === 0) return null;
  return filtered[Math.floor(Math.random() * filtered.length)];
}
