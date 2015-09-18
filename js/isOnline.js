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
}

function redirectTo(url) {
    if (url.indexOf('?') === -1) {
        document.location = url;
    } else {
        var params = url.split('?')[1];
        $.localStorage.set("pageparams", params);
        document.location = url.split('?')[0];
    };
}

function ProcessPageParamsAsJson(func) {        
    return convertUrlParamsToJson($.localStorage.get('pageparams'));     
}

function convertUrlParamsToJson(params) {
    var json = '{"' + decodeURI(params).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}';
    return JSON.parse(json);
}