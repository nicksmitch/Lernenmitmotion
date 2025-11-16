// All exercises data for FocusFlow
export const exercises = [
  // INDIVIDUAL ACTIVE EXERCISES
  {
    id: '1',
    category: 'active',
    title: 'Jumping Jacks',
    description: '1. Stehe aufrecht mit Füßen zusammen und Armen an den Seiten.\n2. Springe und spreize gleichzeitig deine Beine schulterbreit.\n3. Hebe gleichzeitig deine Arme über den Kopf.\n4. Springe zurück in die Ausgangsposition.\n5. Wiederhole für 3 Minuten in einem angenehmen Tempo.\n\nVorteile: Aktiviert den Kreislauf, verbessert die Durchblutung und steigert die Energie.',
    duration_minutes: 3,
    roles: ['individual', 'teacher'],
    is_group_exercise: false
  },
  {
    id: '2',
    category: 'active',
    title: 'Schreibtisch-Liegestütze',
    description: '1. Stelle dich etwa einen Meter vor deinen Schreibtisch.\n2. Lege beide Hände schulterbreit auf die Tischkante.\n3. Halte deinen Körper gerade von Kopf bis Fuß.\n4. Beuge die Arme und senke deinen Oberkörper zum Tisch.\n5. Drücke dich zurück in die Ausgangsposition.\n6. Wiederhole 3 Sätze à 10-15 Wiederholungen.\n\nVorteile: Stärkt Brust, Schultern und Arme, löst Verspannungen im Oberkörper.',
    duration_minutes: 4,
    roles: ['individual', 'teacher'],
    is_group_exercise: false
  },
  {
    id: '3',
    category: 'active',
    title: 'Kniebeugen',
    description: '1. Stehe mit Füßen schulterbreit auseinander.\n2. Strecke deine Arme nach vorne für Balance.\n3. Senke deinen Körper, als würdest du dich setzen.\n4. Halte die Knie hinter den Zehenspitzen.\n5. Drücke dich durch die Fersen zurück nach oben.\n6. Wiederhole 3 Sätze à 12-15 Wiederholungen.\n\nVorteile: Aktiviert große Muskelgruppen, verbessert die Durchblutung der Beine.',
    duration_minutes: 5,
    roles: ['individual', 'teacher'],
    is_group_exercise: false
  },
  {
    id: '4',
    category: 'active',
    title: 'Nacken- und Schulterkreisen',
    description: '1. Setze dich aufrecht hin oder stehe gerade.\n2. Lasse deine Schultern entspannt hängen.\n3. Kreise langsam mit den Schultern nach hinten (10 Mal).\n4. Kreise langsam mit den Schultern nach vorne (10 Mal).\n5. Neige den Kopf sanft zur rechten Seite (10 Sekunden halten).\n6. Neige den Kopf sanft zur linken Seite (10 Sekunden halten).\n7. Wiederhole 2-3 Mal.\n\nVorteile: Löst Verspannungen im Nacken, verbessert die Beweglichkeit.',
    duration_minutes: 4,
    roles: ['individual', 'teacher'],
    is_group_exercise: false
  },
  {
    id: '5',
    category: 'active',
    title: 'Ausfallschritte',
    description: '1. Stehe aufrecht mit Händen an den Hüften.\n2. Mache einen großen Schritt nach vorne mit dem rechten Fuß.\n3. Senke deinen Körper, bis beide Knie 90-Grad-Winkel bilden.\n4. Drücke dich mit dem vorderen Fuß zurück zur Ausgangsposition.\n5. Wechsle das Bein.\n6. Wiederhole 10 Ausfallschritte pro Bein (3 Sätze).\n\nVorteile: Kräftigt Beine und Po, verbessert Balance und Koordination.',
    duration_minutes: 5,
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
  {
    id: '12',
    category: 'relaxed',
    title: 'Progressive Muskelentspannung',
    description: '1. Setze oder lege dich bequem hin.\n2. Beginne mit den Füßen: Spanne die Muskeln für 5 Sekunden an.\n3. Entspanne die Muskeln vollständig für 10 Sekunden.\n4. Arbeite dich nach oben: Waden, Oberschenkel, Bauch, Arme.\n5. Spanne jeweils eine Muskelgruppe an und entspanne sie bewusst.\n6. Achte auf den Unterschied zwischen Anspannung und Entspannung.\n7. Schließe mit tiefen Atemzügen ab.\n\nVorteile: Löst körperliche Verspannungen, reduziert Stress.',
    duration_minutes: 7,
    roles: ['individual', 'teacher'],
    is_group_exercise: false
  },
  {
    id: '13',
    category: 'relaxed',
    title: 'Achtsamkeitsmeditation',
    description: '1. Setze dich bequem hin und schließe die Augen.\n2. Richte deine Aufmerksamkeit auf deinen Atem.\n3. Beobachte, wie der Atem ein- und ausströmt.\n4. Wenn Gedanken auftauchen, nimm sie wahr ohne zu urteilen.\n5. Kehre sanft zum Atem zurück.\n6. Spüre den gegenwärtigen Moment.\n7. Praktiziere für 5-7 Minuten.\n\nVorteile: Verbessert Konzentration und Fokus, reduziert mentalen Stress.',
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
  {
    id: '22',
    category: 'active',
    title: 'Gordischer Knoten',
    description: 'Für 6-12 Personen\n\n1. Alle stehen im Kreis, eng beieinander.\n2. Streckt eure rechte Hand aus und greift eine andere Hand (nicht die direkt neben euch).\n3. Streckt eure linke Hand aus und greift eine andere Hand.\n4. Ohne Hände loszulassen, versucht den Knoten zu entwirren.\n5. Kommuniziert und arbeitet zusammen.\n6. Ziel: Ein Kreis oder zwei verschlungene Kreise.\n\nVorteile: Teamwork, Problemlösung, körperliche Aktivierung.',
    duration_minutes: 6,
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
  {
    id: '32',
    category: 'relaxed',
    title: 'Stille Minute Challenge',
    description: 'Für ganze Klasse\n\n1. Alle setzen oder stehen bequem.\n2. Schließt die Augen.\n3. Eine Minute absolute Stille - keine Bewegung, kein Geräusch.\n4. Konzentriert euch nur auf euren Atem.\n5. Öffnet nach der Minute langsam die Augen.\n6. Wer hat es geschafft?\n\nVorteile: Fördert Selbstkontrolle, Konzentration und innere Ruhe.',
    duration_minutes: 3,
    roles: ['teacher'],
    is_group_exercise: true
  }
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
