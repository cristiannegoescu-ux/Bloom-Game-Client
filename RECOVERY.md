# Bloom Game Client — Recovery Guide

## Run (development)

```powershell
cd C:\Users\cnegoescu\bloom-game-client
npm install        # first time only
npm start          # launches Snake game fullscreen
```

## GitHub repo

```
https://github.com/cristiannegoescu-ux/Bloom-Game-Client
```

## Game controls

| Key | Action |
|-----|--------|
| Arrow keys / WASD | Move the snake |
| `S` | Simulate a **Critical Crash** — sends crash report to Bloom AI |
| `F` | Simulate a **Defect Found** — sends defect report to Bloom AI |
| `F11` | Toggle fullscreen |
| `Escape` | Exit fullscreen |

## Crash flow (S key)

```
Press S in-game
    │
    ├── Game stops, minimal crash screen shown (ID + "Bloom AI notified")
    │
    ├── POST → http://127.0.0.1:3333/defect  →  Bloom Assistant
    │             ├── White toast notification (bottom-right, red border)
    │             └── Widget turns red + badge
    │
    └── User clicks toast / tray icon / widget
                │
                ▼
        Bloomberg Platform opens → Reporter page
        → bloomShowReport() modal appears with:
            - Report ID, Type, Severity, Session, Timestamp, Score
            - Summary
            - Full call stack
            - "Add to Sent Reports" button → adds row to Reporter table
```

## Defect flow (F key / eating bug food 🐛)

```
Press F  —or—  snake eats 🐛 bug food
    │
    ├── Defect overlay shown in game (pauses game)
    │
    ├── POST → http://127.0.0.1:3333/defect  →  Bloom Assistant
    │             ├── White toast notification (orange border)
    │             └── Widget turns red + badge
    │
    └── Click "View in Bloomberg Reporter" → opens platform in browser
        Click "Dismiss" → game resumes
```

## Files

| File | Purpose |
|------|---------|
| `src/main.js` | Electron main — fullscreen window, F11/Escape shortcuts |
| `src/game.html` | Snake game, crash/defect overlays, sendToBloom() |
| `assets/game.png` | App icon |

## Restore from scratch

```powershell
git clone https://github.com/cristiannegoescu-ux/Bloom-Game-Client.git C:\Users\cnegoescu\bloom-game-client
cd C:\Users\cnegoescu\bloom-game-client
npm install
npm start
```

## Build .exe installer

```powershell
cd C:\Users\cnegoescu\bloom-game-client
npm run build
# Output: dist\Bloom Game Client Setup.exe
# Requires: assets\game.ico  (convert game.png at https://convertio.co/png-ico/)
```

## Dependencies

- Bloom Assistant must be running on `127.0.0.1:3333` to receive crash/defect events
- If Bloom Assistant is not running, events are silently dropped (game still works)
