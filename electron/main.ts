import { app, BrowserWindow, ipcMain } from 'electron'
import axios from "axios";
const fs = require('fs')
const path = require('path')


app.whenReady().then(() => {
    const win = new BrowserWindow({
        width: 1600,
        height: 1000,
        title: 'Nahida Board',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    })
    win.setMinimumSize(1200, 800)



    // You can use `process.env.VITE_DEV_SERVER_URL` when the vite command is called `serve`
    if (process.env.VITE_DEV_SERVER_URL) {
        win.loadURL(process.env.VITE_DEV_SERVER_URL)
    } else {
        // Load your file
        win.loadFile('dist/index.html')
    }
})

const filePath = path.join(app.getPath('documents'), 'NahidaBoard', 'data.json')

ipcMain.on('init-load', (event) => {

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            fs.mkdir(path.dirname(filePath), { recursive: true }, (err) => {
                if (err) {
                    console.error(`Error creating directory: ${err.message}`);
                }
            })
            event.reply('init-load-response', {})
        } else {
            fs.readFile(filePath, 'utf-8', (err, data) => {
                if (err) {
                    event.reply('init-load-response', {})
                } else {
                    event.reply('init-load-response', JSON.parse(data))
                }
            })
        }
    })
})

// 保存json
ipcMain.on('save', (_event, data) => {
    fs.writeFile(filePath, JSON.stringify(data), 'utf-8', (err) => {
        if (err) {
            console.error(`Error writing file: ${err.message}`)
        } else {
            console.log(`File saved at ${filePath}`)
        }
    })
})

// 获取enka数据
const enkaUrl = "https://enka.network/api/uid/"
ipcMain.on('getenka', async (event, uid) => {
    const response = await axios.get(enkaUrl + uid)
    const data = response.data

    event.reply('enka-response', data)
})



