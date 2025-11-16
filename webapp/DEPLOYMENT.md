# FocusFlow - Deployment Anleitung

## 🚀 Schnellstart

### Lokale Entwicklung
```bash
cd webapp
npm install
npm run dev
```
App läuft auf: http://localhost:5173

### Production Build
```bash
npm run build
```
Output in: `dist/` Ordner

## 📦 Vercel Deployment (Empfohlen)

### Methode 1: Vercel CLI (Schnellste)
```bash
# Vercel CLI installieren
npm i -g vercel

# Im webapp Ordner deployen
cd webapp
vercel

# Für Production
vercel --prod
```

### Methode 2: GitHub Integration
1. Code zu GitHub pushen
2. Auf https://vercel.com anmelden
3. "New Project" klicken
4. GitHub Repository verbinden
5. Einstellungen:
   - Framework Preset: **Vite**
   - Root Directory: `webapp` (wenn nicht im Root)
   - Build Command: `npm run build` (Auto-detect)
   - Output Directory: `dist` (Auto-detect)
6. "Deploy" klicken
7. Fertig! URL wird angezeigt

### Methode 3: Drag & Drop
1. `npm run build` ausführen
2. `dist` Ordner auf https://vercel.com/new ziehen
3. Deployment startet automatisch

## 🌍 Andere Hosting-Plattformen

### Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
cd webapp
netlify deploy --prod
```

### GitHub Pages
```bash
# In package.json hinzufügen:
"homepage": "https://username.github.io/focusflow"

# Build & Deploy
npm run build
# Dann dist/ Ordner committen
```

### Cloudflare Pages
1. GitHub Repository verbinden
2. Build command: `npm run build`
3. Build output: `dist`

## ⚙️ Environment Variables

Diese App benötigt **KEINE** Environment Variables!
Alle Daten werden lokal im Browser gespeichert.

## 🔧 Custom Domain

### Auf Vercel
1. Im Vercel Dashboard: Settings → Domains
2. Custom Domain hinzufügen
3. DNS Records bei Domain-Provider setzen

## 📊 Monitoring

Nach Deployment kannst du nutzen:
- Vercel Analytics (kostenlos)
- Google Analytics (hinzufügen in index.html)
- Plausible Analytics (Privacy-friendly)

## 🐛 Troubleshooting

### Build schlägt fehl
```bash
# Cache löschen und neu installieren
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Routes funktionieren nicht (404)
→ `vercel.json` ist bereits konfiguriert für SPA routing

### LocalStorage Probleme
→ User muss Cookies akzeptieren
→ Private/Incognito Mode kann LocalStorage blockieren

## 📝 Post-Deployment Checklist

- [ ] App öffnen und testen
- [ ] Timer starten/stoppen testen
- [ ] Übungen testen (beide Kategorien)
- [ ] Vorlese-Funktion testen
- [ ] Mobile Version testen
- [ ] LocalStorage persistiert nach Reload

## 🎯 Performance Tipps

- Vite optimiert automatisch für Production
- Lazy Loading ist aktiviert
- Images sind als Data URLs eingebettet
- Keine externe API-Calls = Schnell!

## 📱 PWA (Optional)

Um eine installierbare App zu machen:
1. `vite-plugin-pwa` installieren
2. `manifest.json` erstellen
3. Service Worker konfigurieren

## 🔐 Sicherheit

- Keine sensiblen Daten
- Kein Backend = Keine Angriffsfläche
- LocalStorage ist origin-gebunden
- HTTPS wird von Vercel bereitgestellt

## 🆘 Support

Bei Problemen:
1. README.md lesen
2. Build logs prüfen
3. Browser Console checken
