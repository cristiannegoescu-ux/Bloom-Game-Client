const { app, BrowserWindow, nativeImage } = require('electron');
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
}

app.whenReady().then(() => {
  app.setAppUserModelId('com.ubisoft.bloom-game-client');
  createGameWindow();
});

app.on('window-all-closed', () => app.quit());
