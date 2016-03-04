var url;
var text = '';
var labelClr = '#4285F4';
var www1 = 'https://stats.wordpress.com/csv.php?api_key=';
var www3 = '&blog_uri='
var www5 = '&table=views&days=1&format=xml';


function save_options() {
  var www = document.getElementById('www').value;
  var key = document.getElementById('key').value;
  var clr = document.getElementById('clr').value;
  chrome.storage.sync.set({
    favoriteWww: www,
    favoriteKey: key,
    favoriteClr: clr
  }, function() {
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 1000);
  });

 restore_options();

}



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
   
    chrome.storage.sync.get({
    favoriteWww: '',
    favoriteKey: '',
    favoriteClr: ''
    }, function(items) {
    	www4 = items.favoriteWww;
    	www2 = items.favoriteKey;
        labelClr = items.favoriteClr;
	url = www1 + www2 + www3 + www4 + www5;
	chrome.browserAction.setBadgeBackgroundColor({ color: "#00FF00"});
	
        sendRequest(url, function (response) {  	
	text = response;
    	chrome.browserAction.setBadgeText({text});
	chrome.browserAction.setBadgeBackgroundColor({ color: labelClr});
    });
}
)};


function reload_options() {
    chrome.storage.sync.get({
    favoriteWww: '',
    favoriteKey: '',
    favoriteClr: ''
  }, function(items) {
    document.getElementById('www').value = items.favoriteWww;
    document.getElementById('key').value = items.favoriteKey;
    document.getElementById('clr').value = items.favoriteClr;
  });
}


document.addEventListener('DOMContentLoaded', reload_options);
document.getElementById('save').addEventListener('click',
    save_options);
