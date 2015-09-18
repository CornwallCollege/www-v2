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
        isOnline({
            yes: function () {                
                document.location = url;
            },
            no: function () {
                var storage = $.localStorage;
                var params = url.split('?')[1];
                storage.set("pageparams", convertUrlParamsToJson(params));
                document.location = url.split('?')[0];
            }
        });
    }
}

function ProcessPageParamsAsJson(func) {
    isOnline({
       yes: function() {
           func(convertUrlParamsToJson(window.location.search.substring(1)));
       },
       no: function() {
           var storage = $.localStorage;
           var pageParams = storage.get('pageparams');
           alert("page params = " + pageParams);
           func(pageParams);
       }
    });
}

function convertUrlParamsToJson(params) {
    var json = '{"' + decodeURI(params).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}';
    return JSON.parse(json);
}