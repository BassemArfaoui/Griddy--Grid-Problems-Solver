const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

// Function to create the Electron window
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // Allows Node.js integration if needed (not recommended for production)
      contextIsolation: false, // To allow Node.js in renderer
    },
  });

  // Load React app from localhost:3000 in development mode
  mainWindow.loadURL('http://localhost:3000');

  // Open Developer Tools automatically
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});
