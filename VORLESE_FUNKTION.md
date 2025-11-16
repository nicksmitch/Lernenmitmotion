# Vorlese-Funktion (Text-to-Speech)

## Übersicht
FocusFlow bietet eine integrierte Vorlese-Funktion, die Übungsanleitungen laut vorliest. Dies ist besonders nützlich, wenn man während der Übung nicht auf den Bildschirm schauen kann.

## Funktionen

### 🔊 Vorlesen starten
- Klicke auf den **Lautsprecher-Button** (oben rechts im Übungs-Modal)
- Die Übung wird in folgender Reihenfolge vorgelesen:
  1. Titel der Übung
  2. Dauer der Übung
  3. Vollständige Anleitung Schritt für Schritt

### ⏸️ Vorlesen stoppen
- Klicke erneut auf den Button (wird rot wenn aktiv)
- Oder schließe das Modal / wechsle zur nächsten Übung

### ✨ Features
- **Deutsche Stimme**: Nutzt automatisch eine deutsche Sprachausgabe
- **Angepasste Geschwindigkeit**: Leicht verlangsamt (0.9x) für besseres Verständnis
- **Automatische Bereinigung**: Zeilenumbrüche werden intelligent behandelt
- **Visuelle Anzeige**: Hervorgehobener Hintergrund während des Vorlesens
- **Browser-nativ**: Keine externe API oder Internetverbindung nötig

## Browser-Unterstützung

### ✅ Vollständig unterstützt
- **Chrome/Edge**: Beste Unterstützung, viele deutsche Stimmen
- **Safari (macOS/iOS)**: Native deutsche Siri-Stimmen
- **Firefox**: Gute Unterstützung

### 📱 Mobile Geräte
- **iPhone/iPad**: Verwendet iOS Siri-Stimmen
- **Android**: Verwendet Google TTS-Stimmen

## Tipps für beste Ergebnisse

1. **Lautstärke prüfen**: Stelle sicher, dass die System-Lautstärke aktiviert ist
2. **Ruhige Umgebung**: Für besseres Verständnis
3. **Erste Nutzung**: Beim ersten Mal kann es eine kurze Verzögerung geben, während Stimmen geladen werden
4. **Pause während Timer läuft**: Timer kann pausiert werden, um der Übung zu folgen

## Technische Details

- Verwendet die **Web Speech API** (SpeechSynthesis)
- Keine Kosten oder API-Schlüssel erforderlich
- Funktioniert offline (nach initialem Laden der Stimmen)
- Sprache: `de-DE` (Deutsch)
- Geschwindigkeit: 0.9x (90% der normalen Sprechgeschwindigkeit)

## Fehlerbehebung

### "Dein Browser unterstützt keine Sprachausgabe"
→ Verwende einen modernen Browser (Chrome, Safari, Firefox, Edge)

### Keine Stimme zu hören
→ Prüfe:
1. System-Lautstärke
2. Browser hat Berechtigung für Audio
3. Keine anderen Tabs spielen Audio ab

### Falsche Sprache
→ Browser kann keine deutsche Stimme finden. Installiere deutsche Sprachpakete in den Systemeinstellungen.

## Datenschutz
Die Vorlese-Funktion:
- Funktioniert komplett im Browser
- Sendet keine Daten an externe Server
- Verwendet nur lokale Text-to-Speech-Engines
- Speichert keine Audio-Aufnahmen
