function isOnline(func) {
    var xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHttp');
    xhr.onload = function () {
        if (func.yes instanceof Function) {
            func.yes();
        }
    }
    xhr.onerror = function () {
        if (func.no instanceof Function) {
            func.no();
        }
    }
    xhr.open("GET", "anypage.php", true);
    xhr.send();
    if (func.fin instanceof Function) {
        func.fin();
    };
}