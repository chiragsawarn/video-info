const electron = require("electron");
const ffmpeg = require("fluent-ffmpeg");

const { app, BrowserWindow, ipcMain } = electron;

app.disableHardwareAcceleration();
let mainWindow;

app.on("ready", () => {
  console.log("App is ready!");
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on("video:submit", (event, path) => {
  ffmpeg.ffprobe(path, (err, metadata) => {
    mainWindow.webContents.send("video:metadata", metadata.format.duration);
  });
});
