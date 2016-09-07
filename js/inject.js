//Messaggi da mostrare nella pagina https://apikey.wordpress.com/
var testo1 = 'Above there you can find the API Key to copy and paste into the form field required to start using WP STATS.';
var testo2 = 'Must come with your credentials in your Wordpress.com account to find Akismet API Key.';


//routine controllo pagina...
var TextInside = document.getElementsByTagName('p')[0].innerHTML;

var n = TextInside.search("must");
if (n < 0) {
    var t2 = document.createTextNode(testo1); 
} else {
    var t2 = document.createTextNode(testo2); 
};

//Creazione oggetto 'bottone' e iniezione nella pagina    
var button2 = document.createElement("button");
button2.appendChild(t2);   
document.body.appendChild(button2);









