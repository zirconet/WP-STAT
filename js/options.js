var url;
var text = '';
var labelClr = '#4285F4';
var www1 = 'https://stats.wordpress.com/csv.php?api_key=';
var www3 = '&blog_uri=';
var www5 = '&table=views&';
var tempo = 'days=1';
var www6 = '&format=xml';

function close_options() {
window.close();
}


function material_options() {
var newURL = "chrome://flags/#top-chrome-md";
        chrome.tabs.create({ url: newURL });
}


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
    });
}
)};


function reload_options() {
    chrome.storage.sync.get({
    favoriteWww: '',
    favoriteKey: '',
    favoriteTmp: '',
    favoriteClr: ''
  }, function(items) {
    document.getElementById('www').value = items.favoriteWww;
    document.getElementById('key').value = items.favoriteKey;
    document.getElementById('clr').value = items.favoriteClr;
    document.getElementById('tmp').value = items.favoriteTmp;
  });
}


document.addEventListener('DOMContentLoaded', reload_options);
document.getElementById('save').addEventListener('click',
    save_options);
document.getElementById('close').addEventListener('click',
    close_options);
document.getElementById('material').addEventListener('click',
    material_options);
