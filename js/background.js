//inizializzazione variabili
var url;
var text = 'Wait!';
var start = false;
var time = 180000;
var labelClr = '#4285F4';
var www1 = 'https://stats.wordpress.com/csv.php?api_key=';
var www3 = '&blog_uri='
var www5 = '&table=views&';
var tempo = 'days=1';
var www6 = '&format=xml';
var titolo = 'WP STATS counted ';


// calcolo versione corrente dell'estensione 
var verchrome = chrome.app.getDetails().version;


//NOTIFICATION ---------- inizio --------
var warningId = 'notification.warning';

function hideWarning(done) {
  chrome.notifications.clear(warningId, function() {
    if (done) done();
  });
}

function showWarning() {
  hideWarning(function() {
    chrome.notifications.create(warningId, {
      iconUrl: chrome.runtime.getURL('img/icon128.png'),
      title: 'WP STATS',
      type: 'basic',
      message: 'New version ('+ verchrome +') has been installed. ' +
               'Enjoy it.',
      buttons: [{ title: 'Learn more...' }],
      isClickable: true,
      priority: 2,
    }, function() {});
  });
}


function openWarningPage() {
  chrome.tabs.create({
    url: 'http://cittadinoimperfetto.altervista.org/WP_Stats/update.html'
  });
}
//NOTIFICATION ---------- fine --------


//evento all'installazione dell'estensione (richiamo option.html)
//evento all'update dell'estensione (richiamo alla notifica)
chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        chrome.tabs.create({url: "option.html"});
    }else if(details.reason == "update"){
        showWarning();
    }
});


chrome.runtime.setUninstallURL('http://cittadinoimperfetto.altervista.org/WP_Stats/unistall.html');


//inizializzazione etichetta estensione
chrome.browserAction.setBadgeText({text});
chrome.browserAction.setBadgeBackgroundColor({ color: labelClr});


//richiamo funzione all'avvio dell'estensione
on_start();


//Loop controllo e aggiornamento contatore
var readyStateCheckInterval = setInterval(function() {
	restore_options();
	sendRequest(url, function (response) {	
	text = response;
	if (text != null)
		{
		start = true;
    		chrome.browserAction.setBadgeText({text});
        	chrome.browserAction.setBadgeBackgroundColor({ color: labelClr});
		chrome.browserAction.setTitle({title : titolo+text+" views"});  
		};
	}
)}, time); 


//XMLHttpRequest
function sendRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
		var xmlDoc = xhr.responseXML;
		var x = xmlDoc.getElementsByTagName("total")[0].childNodes[0].nodeValue;
            	callback(x);
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
}


//aggiornamento contatore
function restore_options() {
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
	url = www1 + www2 + www3 + www4 + www5 + tempo + www6;
	if (start == true) {	
			chrome.browserAction.setBadgeBackgroundColor({ color: "#00FF00"});
			   };
  });

	sendRequest(url, function (response) {  	
	text = response;
	if (text != null)
		{
		start = true;
    		chrome.browserAction.setBadgeText({text});
        	chrome.browserAction.setBadgeBackgroundColor({ color: labelClr});
		chrome.browserAction.setTitle({title : titolo+text+" views"});  
		};
});	
}


//funzione all'avvio dell'estensione
function on_start() {
    
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
	url = www1 + www2 + www3 + www4 + www5 + tempo + www6;
	chrome.browserAction.setBadgeBackgroundColor({ color: "#00FF00"});
	
        sendRequest(url, function (response) {  	
	text = response;
    	chrome.browserAction.setBadgeText({text});
	chrome.browserAction.setBadgeBackgroundColor({ color: labelClr});
	chrome.browserAction.setTitle({title : titolo+text+" views"});  
    });
}
)};

chrome.browserAction.onClicked.addListener(openWarningPage);
chrome.notifications.onClicked.addListener(openWarningPage);
chrome.notifications.onButtonClicked.addListener(openWarningPage);


