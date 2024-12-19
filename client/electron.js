import { app, BrowserWindow } from 'electron';
import path from 'path';

let mainWindow;

const createWindow = () => {
  // Create a new browser window
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,  // Optional, allows Node.js integration in the renderer
    },
  });

  // Load React app (assuming it's running on http://localhost:3000 in development mode)
  mainWindow.loadURL('http://localhost:3000');

  // Open Developer Tools (optional, for debugging)
  mainWindow.webContents.openDevTools();

  // Clean up when the window is closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

// Create the window when the app is ready
app.on('ready', createWindow);

// Quit the app when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// Re-create the window if the app is re-activated (macOS)
app.on('activate', () => {
  if (mainWindow === null) createWindow();
});
