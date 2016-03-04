var url;
var text = '';
var labelClr = '#4285F4';

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


function restore_options() {
    
    text = 'wait';
    chrome.browserAction.setBadgeText({text});

    var version = document.getElementById('version');
    var verchrome = chrome.app.getDetails().version;
    version.textContent = 'ver. ' + verchrome;
   
    chrome.storage.sync.get({
    favoriteWww: '',
    favoriteKey: '',
    favoriteClr: ''
    }, function(items) {
    	www4 = items.favoriteWww;
    	www2 = items.favoriteKey;
        labelClr = items.favoriteClr;
	var www1 = 'https://stats.wordpress.com/csv.php?api_key=';
	var www3 = '&blog_uri='
	var www5 = '&table=views&days=1&format=xml';
	url = www1 + www2 + www3 + www4 + www5;
	chrome.browserAction.setBadgeBackgroundColor({ color: "#00FF00"});
	
        sendRequest(url, function (response) {  	
	text = response;
    	chrome.browserAction.setBadgeText({text});
	chrome.browserAction.setBadgeBackgroundColor({ color: labelClr});
    });
}
)};	



document.addEventListener('DOMContentLoaded', function () {
  restore_options();
});
