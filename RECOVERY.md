# Bloom Game Client — Recovery Guide

## Run (development)

```powershell
cd C:\Users\cnegoescu\bloom-game-client
npm install        # first time only
npm start          # launches Snake game window
```

## Game rules

- **Arrow keys / WASD** — move the snake
- **Green dot** — normal food, +10 pts per level
- **🐛 red dot** — bug food. Eating it triggers a defect event:
  1. Game pauses
  2. Bloom AI defect report overlay appears (DEMO MODE — no real Jira ticket)
  3. A POST is sent to Bloom Assistant at `127.0.0.1:3333/defect`
  4. Bloom shows a Windows notification + widget turns red
  5. Click **"View in Bloomberg Reporter"** → opens `http://10.18.68.179/platform/#reporter`
  6. Click **Dismiss** → game resumes

## Defect flow diagram

```
Snake eats 🐛 bug food
        │
        ▼
Defect overlay shown in game window
        │
        ├──► POST http://127.0.0.1:3333/defect  ──► Bloom Assistant
        │                                              ├── Windows Toast notification
        │                                              └── Widget turns red + badge
        │
        └──► User clicks "View in Bloomberg Reporter"
                    │
                    ▼
             http://10.18.68.179/platform/#reporter (browser/Bloom window)
```

## Files

| File | Purpose |
|------|---------|
| `src/main.js` | Electron main process |
| `src/game.html` | Snake game + defect overlay (self-contained) |

## Build .exe installer

```powershell
cd C:\Users\cnegoescu\bloom-game-client
npm run build
# Output: dist\Bloom Game Client Setup.exe
```
