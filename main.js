const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1360,               
    height: 1280,              
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), 
      nodeIntegration: true,   
      contextIsolation: false  
    }
  });

  mainWindow.loadFile('index.html');

  mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();  
});


app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});