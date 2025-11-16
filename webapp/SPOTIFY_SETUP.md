# 🎵 Spotify Integration Setup

## Schritt-für-Schritt Anleitung

### 1. Spotify Developer Account erstellen

1. Gehe zu https://developer.spotify.com/dashboard
2. Melde dich mit deinem Spotify Account an (kostenlos)
3. Akzeptiere die Terms of Service

### 2. Neue App erstellen

1. Klicke auf **"Create app"**
2. Fülle die Felder aus:
   ```
   App name: FocusFlow (oder beliebig)
   App description: Learning app with focus music
   Website: https://your-app.vercel.app (oder leer lassen)
   Redirect URI: 
     - http://localhost:5173/  (für lokale Entwicklung)
     - https://your-app.vercel.app/  (nach Vercel Deploy)
   
   ✅ Web API ankreuzen
   ✅ Web Playback SDK ankreuzen
   ```
3. Klicke **"Save"**

### 3. Client ID kopieren

1. In deiner neuen App, klicke auf **"Settings"**
2. Kopiere die **Client ID** (eine lange Zeichenkette)
3. ⚠️ **Client Secret wird NICHT benötigt** (nur für Backend-Apps)

### 4. Client ID in App einfügen

#### Option A: Direkt in Code (Development)
1. Öffne `src/config/spotify.js`
2. Ersetze `YOUR_SPOTIFY_CLIENT_ID_HERE` mit deiner Client ID:
   ```javascript
   CLIENT_ID: 'abc123def456...',  // 👈 Hier einfügen
   ```

#### Option B: Environment Variable (Production - Empfohlen)
1. Erstelle `.env.local` im webapp Ordner:
   ```
   VITE_SPOTIFY_CLIENT_ID=abc123def456...
   ```
2. In `src/config/spotify.js` ändern:
   ```javascript
   CLIENT_ID: import.meta.env.VITE_SPOTIFY_CLIENT_ID || 'YOUR_SPOTIFY_CLIENT_ID_HERE',
   ```
3. Bei Vercel: Settings → Environment Variables → VITE_SPOTIFY_CLIENT_ID

### 5. Redirect URI nach Deploy aktualisieren

Nach dem Vercel-Deployment:
1. Gehe zurück zu https://developer.spotify.com/dashboard
2. Öffne deine App → **Settings**
3. Füge deine Vercel URL zu Redirect URIs hinzu:
   ```
   https://your-app-name.vercel.app/
   ```
4. Klicke **"Save"**

### 6. Testen

1. Starte die App: `npm run dev`
2. Gehe zum Dashboard
3. Klicke auf **"Mit Spotify verbinden"**
4. Login mit Spotify Account
5. Erlaube die Berechtigungen
6. Du wirst zurück zur App weitergeleitet
7. Suche nach "Binaural Beats Focus" oder anderen Playlists
8. Klicke auf eine Playlist zum Abspielen

## ⚠️ Wichtige Hinweise

### Spotify Premium erforderlich
- Web Playback funktioniert **nur** mit Spotify Premium
- Free Accounts können sich verbinden, aber keine Musik abspielen
- Die App zeigt eine entsprechende Meldung

### Redirect URI muss exakt übereinstimmen
- Mit `/` am Ende: `http://localhost:5173/` ✅
- Ohne `/` am Ende: `http://localhost:5173` ❌
- HTTPS in Production erforderlich (Vercel macht das automatisch)

### Rate Limits
- Spotify API: 180 requests pro Minute
- Sollte für normale Nutzung ausreichen

## 🎯 Features

### ✨ Was funktioniert:
- ✅ Spotify Account Verbindung (OAuth)
- ✅ Playlist Suche ("Binaural Beats Focus", etc.)
- ✅ Musik Wiedergabe während Lernphasen
- ✅ Play/Pause Steuerung
- ✅ Lautstärke-Regler
- ✅ Aktueller Track anzeigen
- ✅ Album Cover anzeigen

### 🚧 Limitationen:
- Nur für Spotify Premium
- Keine Offline-Wiedergabe (Browser muss online sein)
- Ein aktives Gerät zur Zeit (wird pausiert wenn woanders abgespielt wird)

## 🔧 Troubleshooting

### "Spotify nicht konfiguriert" Warnung
→ Client ID noch nicht eingetragen in `src/config/spotify.js`

### "Invalid redirect URI" Fehler
→ Redirect URI in Spotify Dashboard muss exakt mit App URL übereinstimmen
→ Vergiss nicht den `/` am Ende!

### "Spotify Premium benötigt"
→ Web Playback SDK funktioniert nur mit Premium Account
→ Upgrade: https://www.spotify.com/premium/

### Player verbindet nicht
1. Prüfe Browser Console auf Fehler
2. Lösche localStorage: `localStorage.clear()`
3. Neu einloggen
4. Stelle sicher, dass keine andere Spotify App aktiv ist

### Playlist nicht gefunden
→ Versuche andere Suchbegriffe:
- "Study Music"
- "Focus Beats"
- "Concentration"
- "Lo-fi Study"

## 🎨 Anpassungen

### Andere Standard-Playlist
In `SpotifyPlayer.jsx` ändere:
```javascript
const [searchQuery, setSearchQuery] = useState('Binaural Beats Focus');
// zu
const [searchQuery, setSearchQuery] = useState('Lo-fi Study');
```

### Auto-Play beim Timer Start
In `Dashboard.jsx` bei `startTimer()` hinzufügen:
```javascript
// Play music if Spotify connected
if (spotifyPlayer && selectedPlaylist) {
  spotifyPlayer.play();
}
```

## 📚 Weitere Ressourcen

- [Spotify Web API Docs](https://developer.spotify.com/documentation/web-api)
- [Web Playback SDK Docs](https://developer.spotify.com/documentation/web-playback-sdk)
- [Spotify Dashboard](https://developer.spotify.com/dashboard)

---

**Bei Fragen:** Check die Browser Console für Fehler-Details!
