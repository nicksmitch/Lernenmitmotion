# FocusFlow - Changelog

## Version 1.1.0 (Latest)

### 🆕 Neue Features

#### Timer-Ablauf Alarm
- ✅ **Modal-Fenster** bei Timer-Ablauf
- 🔔 **Sound-Benachrichtigung** (Browser-Audio)
- ⏱️ **10 Sekunden Auto-Continue** Countdown
- 🎯 **Direkte Pausenauswahl** im Modal
- ✨ **Animationen**: Bounce, Fade-in, Progress Bar

#### Statistiken-Fix
- ✅ **Echtzeit-Updates**: Stats aktualisieren sich sofort
- 📊 **Pausenzähler**: Wird bei jeder Pause erhöht
- ⏱️ **Lernzeit-Tracking**: Korrekte Berechnung
- 💾 **Persistenz**: Bleibt nach Reload erhalten
- 🔄 **Session-Tracking**: Aktuelle Session separat

#### Spotify Integration
- 🎵 **Kompakter Player**: Platzsparend
- 📂 **Expandierbar**: Playlist-Auswahl bei Bedarf
- 🎧 **Web Playback**: Direkt im Browser
- 🔊 **Steuerung**: Play/Pause, Lautstärke
- 🎨 **Track-Info**: Cover + Artist

### 🐛 Bug Fixes

1. **Statistiken aktualisieren sich nicht**
   - Problem: Stats wurden nur bei manuellem Stop aktualisiert
   - Fix: Echtzeit-Update bei jeder Pause & bei Timer-Ablauf

2. **Kein Alarm bei Timer-Ende**
   - Problem: Nur kleiner Toast, leicht zu übersehen
   - Fix: Großes Modal mit Sound und Auto-Continue

3. **Spotify nimmt zu viel Platz**
   - Problem: Player füllte ganze Sidebar
   - Fix: Kompakte Version mit Expand/Collapse

### 🔧 Technische Änderungen

- Neue Komponente: `TimerCompleteModal.jsx`
- Neue Komponente: `SpotifyPlayerCompact.jsx`
- Verbessertes State-Management in Dashboard
- Sound-Notification hinzugefügt (Base64 Audio)
- Layout-Optimierung: 4-Spalten Grid

### 📦 Build-Info

- Bundle Size: 260KB (gzipped: 81KB)
- Dependencies: Keine neuen
- Browser Support: Alle modernen Browser

---

## Version 1.0.0 (Initial Release)

### Features
- ⏱️ Lern-Timer (5-120 Min)
- 🏃 13+ Übungen (Aktiv & Entspannung)
- 🔊 Text-to-Speech Vorlesen
- 👤 Rollen-System (Individual/Teacher)
- 📊 Statistiken
- 📱 Responsive Design
- 💾 LocalStorage Persistenz

---

## Geplante Features (Roadmap)

### v1.2.0
- [ ] Push-Benachrichtigungen (wenn Browser minimiert)
- [ ] Custom Timer-Sounds auswählen
- [ ] Streak-System (Tägliche Nutzung)
- [ ] Dark Mode

### v1.3.0
- [ ] PWA-Support (Installierbar)
- [ ] Offline-Modus
- [ ] Export Statistiken (CSV)
- [ ] Achievements/Badges

### v2.0.0
- [ ] Backend Integration (Optional)
- [ ] Multi-Device Sync
- [ ] Team-Sessions
- [ ] Custom Übungen erstellen

---

**Feedback & Issues**: GitHub Issues oder Direct Contact
