//calcolo versione estensione
var version = document.getElementById('version');
var verchrome = chrome.app.getDetails().version;
version.textContent = 'ver. ' + verchrome;
