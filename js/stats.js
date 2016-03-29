//inizializzazione variabili
var url;
var www1 = 'https://stats.wordpress.com/csv.php?api_key=';
var www3 = '&blog_uri='
var www5 = '&table=postviews&';
var tempo = 'days=1';
var www6 = '&format=xml';


function sendRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
		var xmlDoc = xhr.responseXML;
 		
		var riga0 = document.getElementById('riga0');	
        	riga0.textContent = '- ' + xmlDoc.getElementsByTagName("post")[0].getAttribute('title');
		var valore0 = document.getElementById('valore0');	
        	valore0.textContent = xmlDoc.getElementsByTagName("post")[0].childNodes[0].nodeValue + ' visitors';

		var riga1 = document.getElementById('riga1');	
        	riga1.textContent = '- ' +  xmlDoc.getElementsByTagName("post")[1].getAttribute('title')
		var valore1 = document.getElementById('valore1');	
        	valore1.textContent = xmlDoc.getElementsByTagName("post")[1].childNodes[0].nodeValue + ' visitors';

		var riga2 = document.getElementById('riga2');	
        	riga2.textContent = '- ' +  xmlDoc.getElementsByTagName("post")[2].getAttribute('title')
		var valore2 = document.getElementById('valore2');	
        	valore2.textContent = xmlDoc.getElementsByTagName("post")[2].childNodes[0].nodeValue + ' visitors';

		var riga3 = document.getElementById('riga3');	
        	riga3.textContent = '- ' +  xmlDoc.getElementsByTagName("post")[3].getAttribute('title')
		var valore3 = document.getElementById('valore3');	
        	valore3.textContent = xmlDoc.getElementsByTagName("post")[3].childNodes[0].nodeValue + ' visitors';

		var riga4 = document.getElementById('riga4');	
        	riga4.textContent = '- ' +  xmlDoc.getElementsByTagName("post")[4].getAttribute('title')
		var valore4 = document.getElementById('valore4');	
        	valore4.textContent = xmlDoc.getElementsByTagName("post")[4].childNodes[0].nodeValue + ' visitors';

            	callback(x);
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
};


function on_start() {
  
    chrome.storage.sync.get({
    favoriteWww: '',
    favoriteKey: '',
    favoriteClr: ''
    }, function(items) {
    	www4 = items.favoriteWww;
    	www2 = items.favoriteKey;
        labelClr = items.favoriteClr;

	var res = www4.replace("https://", "");
	var rigawww = document.getElementById('rigawww');
    	rigawww.textContent = 'checking...: ' + res; 

	var link = 'https://wordpress.com/stats/insights/' + res;
	var rigalink = document.getElementById('rigalink');
	rigalink.textContent = 'Go to WORDPRESS.COM stats';
	rigalink.setAttribute("href", link);

	url = www1 + www2 + www3 + www4 + www5 + tempo + www6;
	
        sendRequest(url, function (response) {  
	text = response;
    	});

}
)};


document.addEventListener('DOMContentLoaded', function () {
  on_start();
});

