/*
This file has no dependencies

AJAX Requests
Project: https://github.com/Steve-Fenton/TypeScriptUtilities
Author: Steve Fenton

Example usage:

    import Ajax = require('Ajax');

    function ajaxLogger(response) {
        alert(response.status + ' ' + response.responseText);
    }

    Ajax.httpGet('/test.txt', ajaxLogger, ajaxLogger);

    // Add headers (you can supply any number of additional headers)
    Ajax.httpGet('/test.txt', ajaxLogger, ajaxLogger, { name: 'Authorization', value: 'MYTOKEN' });

    // Post data
    Ajax.httpPost('/test.txt', { key: 'H12', type: 'some type' }, ajaxLogger, ajaxLogger);

*/


export interface IHttpHeader {
    name: string;
    value: string;
}

export interface IResponseHandler {
    (response: any): any;
}

export function httpGet(url: string, successCallback: IResponseHandler, failureCallback: IResponseHandler, ...headers: IHttpHeader[]): void {
    var ajax = new Ajax();
    ajax.send(url, HttpVerb.GET, null, successCallback, failureCallback, headers);
}

export function httpPost(url: string, data: {}, successCallback: IResponseHandler, failureCallback: IResponseHandler, ...headers: IHttpHeader[]) {
    var ajax = new Ajax();
    ajax.send(url, HttpVerb.POST, data, successCallback, failureCallback, headers);
}

class HttpVerb {
    public static CONNECT = 'CONNECT';
    public static DELETE = 'DELETE';
    public static GET = 'GET';
    public static HEAD = 'HEAD';
    public static OPTIONS = 'OPTIONS';
    public static POST = 'POST';
    public static PUT = 'PUT';
    public static TRACE = 'TRACE';
}

class Ajax {
    send(url: string, method: string, data: {}, successCallback: IResponseHandler, failureCallback: IResponseHandler, headers: IHttpHeader[]): void {
        var isComplete = false;
        var request = this.getRequestObject();
        var uniqueUrl = this.getCacheBusterUrl(url);

        request.open(method, url, true);

        // Add headers
        if (data !== null) {
            request.setRequestHeader('Content-type', 'application/json');
        }
        for (var i = 0; i < headers.length; ++i) {
            request.setRequestHeader(headers[i].name, headers[i].value);
        }

        request.onreadystatechange = () => {
            if (request.readyState == 4 && !isComplete) {
                isComplete = true;
                if (this.isResponseSuccess(request.status)) {
                    successCallback.call(request, request);
                } else {
                    failureCallback.call(request, request);
                }
            }
        }

        if (data !== null) {
            request.send(JSON.stringify(data));
        } else {
            request.send();
        }
    }

    private getRequestObject(): XMLHttpRequest {
        var requestObject;
        if (XMLHttpRequest) {
            requestObject = new XMLHttpRequest();
        } else {
            try {
                requestObject = new ActiveXObject('Msxml2.XMLHTTP');
            } catch (e) {
                try {
                    requestObject = new ActiveXObject('Microsoft.XMLHTTP');
                } catch (e) { }
            }
        }

        return requestObject;
    }

    private getCacheBusterUrl(url: string) {
        if (url.indexOf('?') > -1) {
            url += '&' + new Date().getTime();
        } else {
            url += '?' + new Date().getTime();
        }
        return url;
    }

    private isResponseSuccess(responseCode) {
        var firstDigit = responseCode.toString().substring(0, 1);
        switch (firstDigit) {
            case 1:
            case 2:
            case 3:
                // Response code is in 100, 200 or 300 range :)
                return true;
            default:
                // Response code is is 400 or 500 range :(
                return false;
        }
    }
}