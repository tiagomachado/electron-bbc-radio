'use strict';
const electron 	= 	require('electron');
const app 		= 	electron.app;
const ppapi    	= 	require("./js/ppapi");


// adds debug features like hotkeys for triggering dev tools and reload
//require('electron-debug')({showDevTools: true});

// prevent window being garbage collected
let mainWindow;

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

// Flash path.
app.commandLine.appendSwitch("ppapi-flash-path", ppapi.getFlashPath());
// Flash version
app.commandLine.appendSwitch('ppapi-flash-version', ppapi.getVersion());


function createMainWindow() {
	const win = new electron.BrowserWindow({
		width: 380,
		height: 665,
		'accept-first-mouse': true,
    'title-bar-style': 'hidden',
		webPreferences: {
      		plugins: true
    	}
	});

	win.loadURL(`file://${__dirname}/index.html`);
	win.on('closed', onClosed);

	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
});
