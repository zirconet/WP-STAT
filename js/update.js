function read_version(){
    var verchrome = chrome.app.getDetails().version;

    var version = document.getElementById('version');
    version.textContent = 'ver. ' + verchrome;

    var version2 = document.getElementById('version2');
    version2.textContent = ' ' + verchrome;
};


document.addEventListener('DOMContentLoaded', function () {
  read_version();
});
