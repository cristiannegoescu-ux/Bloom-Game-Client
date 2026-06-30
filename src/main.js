const { app, BrowserWindow, nativeImage, globalShortcut } = require('electron');
const path = require('path');

let gameWindow = null;

function createGameWindow() {
  gameWindow = new BrowserWindow({
    fullscreen: true,
    title: 'Bloom Snake — Bloomberg QC Demo',
    icon: path.join(__dirname, '..', 'assets', 'game.png'),
    backgroundColor: '#070a12',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  gameWindow.loadFile(path.join(__dirname, 'game.html'));
  gameWindow.setMenuBarVisibility(false);

  // Allow escaping fullscreen
  gameWindow.on('focus', () => {
    globalShortcut.register('F11', () => {
      if (gameWindow && !gameWindow.isDestroyed()) {
        gameWindow.setFullScreen(!gameWindow.isFullScreen());
      }
    });
    globalShortcut.register('Escape', () => {
      if (gameWindow && !gameWindow.isDestroyed() && gameWindow.isFullScreen()) {
        gameWindow.setFullScreen(false);
      }
    });
  });

  gameWindow.on('blur', () => {
    globalShortcut.unregister('F11');
    globalShortcut.unregister('Escape');
  });
}

app.whenReady().then(() => {
  app.setAppUserModelId('com.ubisoft.bloom-game-client');
  createGameWindow();
});

app.on('window-all-closed', () => app.quit());
app.on('will-quit', () => globalShortcut.unregisterAll());
