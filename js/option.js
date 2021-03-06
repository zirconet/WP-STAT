var url; //inizializzazione variabile indirizzo statistiche
var www1 = 'https://stats.wordpress.com/csv.php?api_key=';
var www3 = '&blog_uri=';
var www5 = '&table=views&';
var tempo = 'days=1';
var www6 = '&format=xml';
var text = ''; //inizializzazione label icona
var labelClr = '#4285F4';


//calcolo versione estensione
var version = document.getElementById('version');
var verchrome = chrome.app.getDetails().version;
version.textContent = 'ver. ' + verchrome;

function close_options() {
window.close();
}


function help_options() {
var newURL = "https://apikey.wordpress.com/";
        chrome.tabs.create({ url: newURL });
}


function material_options() {
var newURL = "chrome://flags/#top-chrome-md";
        chrome.tabs.create({ url: newURL });
}


//funzione salvataggio opzioni con avvio lettura contatore
function save_options() {
  var www = document.getElementById('www').value;
  var key = document.getElementById('key').value;
  var clr = document.getElementById('clr').value;
  var tmp = document.getElementById('tmp').value;
  chrome.storage.sync.set({
    favoriteWww: www,
    favoriteKey: key,
    favoriteTmp: tmp,
    favoriteClr: clr
  }, function() {
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
	setTimeout(function() {
	status.textContent = '';
	}, 750);
  });

 restore_options();
 
}


//funzione collegamento a pagina wordpress.com/stat
function sendRequest(url, callback) {
    
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
		var xmlDoc = xhr.responseXML;
		var x = xmlDoc.getElementsByTagName("total")[0].childNodes[0].nodeValue;
            	
		if (x == undefined || x == null || x.length <= 0){
    		var alert = document.getElementById('alert');
    		alert.textContent = 'Data incorrect, please re-check!';
		setTimeout(function() {
			alert.textContent = '';
			}, 750);
		}
		callback(x);
	}
    };
    xhr.open("GET", url, true);
    xhr.send();
}


function restore_options() {
    
    text = 'wait';
    chrome.browserAction.setBadgeText({text});
   
    chrome.storage.sync.get({
    favoriteWww: '',
    favoriteKey: '',
    favoriteTmp: '',
    favoriteClr: ''
    }, function(items) {
    	www4 = items.favoriteWww;
    	www2 = items.favoriteKey;
        labelClr = items.favoriteClr;
	tempo = items.favoriteTmp;

	if (www4 == undefined || www4 == null || www4.length <= 0){
    		var alert = document.getElementById('alert');
    		alert.textContent = 'Data incorrect, please re-check!';
		setTimeout(function() {
			alert.textContent = '';
			}, 750);
		}
	if (www2 == undefined || www2 == null || www2.length <= 0){
    		var alert = document.getElementById('alert');
    		alert.textContent = 'Data incorrect, please re-check!';
		setTimeout(function() {
			alert.textContent = '';
			}, 750);
		}

	if (tempo == undefined || tempo == null || tempo.length <= 0){
    		var alert = document.getElementById('alert');
    		alert.textContent = 'Data incorrect, please re-check!';
		setTimeout(function() {
			alert.textContent = '';
			}, 750);
		}

	if (labelClr == undefined || labelClr == null || labelClr.length <= 0){
    		var alert = document.getElementById('alert');
    		alert.textContent = 'Data incorrect, please re-check!';
		setTimeout(function() {
			alert.textContent = '';
			}, 750);
		}

	url = www1 + www2 + www3 + www4 + www5 + tempo + www6;
	chrome.browserAction.setBadgeBackgroundColor({ color: "#00FF00"});	

        //invio richiesta lettura contatore
        sendRequest(url, function (response) {  	
	text = response;
	//cambio tag icona
    	chrome.browserAction.setBadgeText({text});
	chrome.browserAction.setBadgeBackgroundColor({ color: labelClr});

	//chiusura pagina opzioni dopo aver visualizzato contatore
	var alert = document.getElementById('alert');
    	alert.textContent = 'OK!';
	setTimeout(function() {
			alert.textContent = '';
			}, 2000);	
	chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.remove(tab.id);
  });
    });
}
)};	


//premendo pulsante 'save' si avvia procedura salvataggio opzioni...
document.getElementById('save').addEventListener('click',
    save_options);
document.getElementById('help').addEventListener('click',
    help_options);
document.getElementById('material').addEventListener('click',
    material_options);


