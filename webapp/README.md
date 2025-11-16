# FocusFlow - Lern-App mit gesunden Pausen

Eine vollständig clientseitige Web-App für Studierende und Schüler mit Timer-Funktion und wissenschaftlich fundierten Bewegungs- und Entspannungspausen.

## Features

✨ **Kern-Features:**
- 🕐 Individueller Lern-Timer (5-120 Minuten)
- 🏃 27 Übungen (Aktiv & Entspannung)
- 👤 Rollen-System (Einzelnutzer & Lehrkräfte)
- 🔊 Text-to-Speech Vorlese-Funktion
- 📱 Responsive Design (Mobile, Tablet, Desktop)
- 💾 LocalStorage für Datenpersistenz

✨ **Übungen:**
- **Einzelnutzer**: 9 aktive + 7 entspannende Übungen
- **Lehrkräfte**: Zusätzlich 6 Gruppen-aktive + 5 Gruppen-entspannende Übungen
- Alle mit detaillierten Anleitungen

## Lokale Installation

```bash
# Dependencies installieren
npm install

# Development Server starten
npm run dev

# App öffnet sich auf http://localhost:5173
```

## Build für Production

```bash
# Production Build erstellen
npm run build

# Build testen
npm run preview
```

## Vercel Deployment

### Option 1: Vercel CLI
```bash
# Vercel CLI installieren
npm i -g vercel

# Im webapp Ordner:
vercel

# Für Production:
vercel --prod
```

### Option 2: GitHub + Vercel Dashboard
1. Repository auf GitHub pushen
2. Auf [vercel.com](https://vercel.com) anmelden
3. "New Project" → GitHub Repository auswählen
4. Root Directory: `webapp` (falls nicht im Root)
5. Framework Preset: Vite
6. Deploy!

### Option 3: Drag & Drop
1. `npm run build` ausführen
2. `dist` Ordner auf [vercel.com/new](https://vercel.com/new) hochziehen

## Projekt-Struktur

```
webapp/
├── src/
│   ├── components/       # React Komponenten
│   │   ├── ui/          # shadcn/ui Komponenten
│   │   ├── ExerciseModal.jsx
│   │   └── RoleSelector.jsx
│   ├── pages/           # Seiten
│   │   ├── LandingPage.jsx
│   │   └── Dashboard.jsx
│   ├── data/            # Mock-Daten
│   │   └── exercises.js
│   ├── lib/             # Utilities
│   │   └── utils.js
│   ├── App.jsx          # Haupt-App
│   ├── App.css
│   ├── index.css
│   └── main.jsx         # Entry Point
├── public/              # Statische Assets
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Technologie-Stack

- **Framework**: React 18
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3
- **Icons**: Lucide React
- **Routing**: React Router v6
- **Notifications**: Sonner
- **Storage**: LocalStorage
- **TTS**: Web Speech API

## Verwendung

### Erster Start
1. Klicke auf "Jetzt starten" oder "Anmelden"
2. Gib einen Namen ein (Demo-Login)
3. Wähle deine Rolle (Einzelnutzer oder Lehrkraft)

### Timer nutzen
1. Stelle Timer-Dauer ein (5-120 Minuten)
2. Klicke "Timer starten"
3. Bei Bedarf: "Pausieren" oder "Beenden"

### Pausen-Übungen
1. Klicke "Aktive Pause" oder "Entspannende Pause"
2. Übung wird zufällig ausgewählt
3. Nutze 🔊 Button für Vorlese-Funktion
4. "Übung abgeschlossen" oder "Andere Übung"

### Statistiken
- Werden automatisch getrackt
- In der rechten Sidebar angezeigt
- Gespeichert in LocalStorage

## Features Details

### Vorlese-Funktion
- Optimierte deutsche Stimme
- Einstellbare Geschwindigkeit (Sehr langsam - Schnell)
- Natürliche Pausen zwischen Schritten
- Funktioniert auf allen modernen Browsern

### Rollen-System
- **Einzelnutzer**: Standard-Übungen für individuelles Lernen
- **Lehrkräfte**: Zusätzliche Gruppen-/Partnerübungen
- Jederzeit im Dashboard änderbar (Settings-Button)

### Responsive Design
- Mobile: Optimiert für iPhone/Android
- Tablet: iPad-optimierte Ansicht
- Desktop: Volle Feature-Nutzung

## Browser-Kompatibilität

✅ Chrome/Edge (empfohlen)
✅ Safari (macOS/iOS)
✅ Firefox
✅ Mobile Browser (iOS Safari, Chrome Android)

## Datenschutz

- Alle Daten werden nur lokal gespeichert (LocalStorage)
- Keine Server-Kommunikation
- Keine Tracking-Tools
- Keine externe Datenübertragung

## Troubleshooting

### Build-Fehler
```bash
# Cache löschen und neu installieren
rm -rf node_modules package-lock.json
npm install
```

### Vorlese-Funktion funktioniert nicht
- Browser-Lautstärke prüfen
- HTTPS erforderlich (oder localhost)
- Moderne Browser verwenden

### LocalStorage voll
- Browser-Daten löschen
- Oder ältere Sessions manuell löschen

## Support & Feedback

Bei Fragen oder Problemen:
- GitHub Issues erstellen
- Oder Dokumentation prüfen

## Lizenz

MIT License - Frei verwendbar für private und kommerzielle Projekte.

---

**Entwickelt mit ❤️ für produktives Lernen**