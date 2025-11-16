# FocusFlow - Lern-App mit gesunden Pausen

Eine moderne Web-App für Studierende und Schüler mit Benutzer-Authentifizierung, Timer-Funktion und wissenschaftlich fundierten Bewegungs- und Entspannungspausen.

## Features

✨ **Kern-Features:**
- 🔐 Benutzer-Authentifizierung mit Supabase (E-Mail + Passwort)
- 🕐 Individueller Lern-Timer (5-120 Minuten)
- 🏃 50 Übungen (Aktiv & Entspannung)
- 👤 Rollen-System (Einzelnutzer & Lehrkräfte)
- 🔊 Text-to-Speech Vorlese-Funktion
- 🎵 Spotify Integration (Fokus-Musik während Lernen)
- 📱 Responsive Design (Mobile, Tablet, Desktop)
- 💾 LocalStorage für Statistiken

✨ **Übungen:**
- **Einzelnutzer**: 15 aktive + 13 entspannende Übungen
- **Lehrkräfte**: Zusätzlich 12 Gruppen-aktive + 10 Gruppen-entspannende Übungen
- Alle mit detaillierten Anleitungen und Bildern

## Supabase Authentication

Diese App verwendet **Supabase** für sichere Benutzer-Authentifizierung.

### Setup

1. Erstelle ein kostenloses Supabase-Projekt auf [supabase.com](https://supabase.com)
2. Kopiere deine **Project URL** und **anon/public key** aus den API-Einstellungen
3. Setze die Environment-Variablen:

**Lokale Entwicklung:**
Erstelle eine `.env` Datei im `webapp` Ordner:
```env
VITE_SUPABASE_URL=deine_supabase_project_url
VITE_SUPABASE_ANON_KEY=dein_supabase_anon_key
```

**Vercel Deployment:**
Setze die Umgebungsvariablen im Vercel Dashboard:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### Supabase Auth Features

- ✅ E-Mail + Passwort Registrierung
- ✅ E-Mail + Passwort Login
- ✅ E-Mail Bestätigung
- ✅ Session Management
- ✅ Automatische Token-Erneuerung
- ✅ Logout Funktion

## Lokale Installation

```bash
# Dependencies installieren
yarn install
# oder
npm install

# Environment-Variablen setzen (siehe Supabase Setup oben)
cp .env.example .env
# Dann .env mit deinen Supabase-Credentials ausfüllen

# Development Server starten
yarn dev
# oder
npm run dev

# App öffnet sich auf http://localhost:5173
```

### 🎵 Spotify Integration (Optional)
Für Hintergrundmusik während Lernphasen:
1. Siehe **[SPOTIFY_SETUP.md](./SPOTIFY_SETUP.md)** für Anleitung
2. Benötigt: Spotify Developer Account + Client ID
3. Spotify Premium für Wiedergabe erforderlich

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