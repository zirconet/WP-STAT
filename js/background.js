var url;
var text = 'Wait!';
var start = false;
var time = 60000;
var first = false;
var www1 = 'https://stats.wordpress.com/csv.php?api_key=';
var www3 = '&blog_uri='
var www5 = '&table=views&days=1&format=xml';

chrome.runtime.onInstalled.addListener(function() {
  chrome.tabs.create({url: "option.html"});
  first = true;
});

chrome.browserAction.setBadgeText({text});
chrome.browserAction.setBadgeBackgroundColor({ color: "#FF0000"});


on_start();


var readyStateCheckInterval = setInterval(function() {
	restore_options();
	sendRequest(url, function (response) {	
	text = response;
	if (text != null)
		{
		start = true;
    		chrome.browserAction.setBadgeText({text});
        	chrome.browserAction.setBadgeBackgroundColor({ color: "#FF0000"});
		};
	}
)}, time); 



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
    chrome.storage.sync.get({
    favoriteWww: '',
    favoriteKey: ''
  }, function(items) {
    	www4 = items.favoriteWww;
    	www2 = items.favoriteKey;
	url = www1 + www2 + www3 + www4 + www5;
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
        	chrome.browserAction.setBadgeBackgroundColor({ color: "#FF0000"});
		};
});	
}


function on_start() {
    
    text = 'wait';
    chrome.browserAction.setBadgeText({text});
    
    chrome.storage.sync.get({
    favoriteWww: '',
    favoriteKey: ''
    }, function(items) {
    	www4 = items.favoriteWww;
    	www2 = items.favoriteKey;
	url = www1 + www2 + www3 + www4 + www5;
	chrome.browserAction.setBadgeBackgroundColor({ color: "#00FF00"});
	
        sendRequest(url, function (response) {  	
	text = response;
    	chrome.browserAction.setBadgeText({text});
	chrome.browserAction.setBadgeBackgroundColor({ color: "#FF0000"});
    });
}
)};

