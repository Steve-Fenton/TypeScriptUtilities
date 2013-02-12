/*
This file has dependencies
 - Encoding.ts
 - Http.ts (optional)

Handles AJAX requests
Project: https://github.com/Steve-Fenton/TypeScriptUtilities
Author: Steve Fenton

Example usage:

var ajaxOkayCallback = function (response: Ajax.IAjaxResponse): void { 
  alert(response.responseText);
};

var ajaxProblemCallback = function (response: Ajax.IAjaxResponse): void { 
  alert('Failed');
};

var ajaxRequest = new Ajax.Request(Http.HttpVerb.GET, '/MyUrl/');
ajaxRequest.addHttpStatusCallback([200, 201], ajaxOkayCallback);
ajaxRequest.addDefaultCallback(ajaxProblemCallback);
ajaxRequest.run();
*/

module Ajax {
    import encoding = Encoding;

    export interface IHttpHeader {
        Name: string;
        Value: string;
    }

    export interface IAjaxRequest {
        addHttpHeader(httpHeader: IHttpHeader);
        addHttpStatusCallback(httpStatusCodes: number[], callback: any);
        run();
    }

    export interface IAjaxResponse {
        status: number;
        responseText: string;
    }

    export class Request implements IAjaxRequest {
        private httpVerb: string;
        private headers: IHttpHeader[] = [];
        private callbacks: { (s: IAjaxResponse): any; }[] = [];
        private defaultCallback: { (s: IAjaxResponse): any; } = null;
        private requestObject: any = {};
        private isComplete: bool = false;

        constructor(httpVerb: string, private uri: string, private isAsync: bool = true) {
            this.httpVerb = httpVerb.toUpperCase();
            this.setRequestObject();
        }

        addHttpHeader(httpHeader: IHttpHeader): void {
            this.headers.push(httpHeader);
        }

        addBasicAuthentication(userName: string, password: string) {
            var token = userName + ':' + password;
            var base64 = new encoding.Base64();

            var authorization = base64.encode(token);
            this.headers.push({ Name: 'Authorization', Value: authorization });
        }

        addHttpStatusCallback(httpStatusCodes: number[], callback: { (s: IAjaxResponse): any; }): void {
            for (var i = 0; i < httpStatusCodes.length; ++i) {
                var statusCode = httpStatusCodes[i];
                this.callbacks[statusCode] = callback;
            }
        }

        addDefaultCallback(callback: { (s: IAjaxResponse): any; }): void {
            this.defaultCallback = callback;
        }

        run() {
            var request = this.requestObject;
            var self = this;

            if (self.uri.indexOf('?') > -1) {
                self.uri += '&' + new Date().getTime();
            } else {
                self.uri += '?' + new Date().getTime();
            }

            request.open(self.httpVerb, self.uri, self.isAsync);
            for (var i = 0; i < self.headers.length; ++i) {
                request.setRequestHeader(self.headers[i].Name, self.headers[i].Value);
            }

            request.onreadystatechange = function () {
                if (request.readyState == 4 && !self.isComplete) {
                    self.isComplete = true;
                    if (self.callbacks[request.status]) {
                        var functionToCall = self.callbacks[request.status];
                        functionToCall(<IAjaxResponse> request);
                    } else if (self.defaultCallback) {
                        self.defaultCallback(<IAjaxResponse> request);
                    }
                }
            }

            request.send();
        }

        private setRequestObject() {
            if (XMLHttpRequest) {
                this.requestObject = new XMLHttpRequest();
            } else {
                try {
                    this.requestObject = new ActiveXObject('Msxml2.XMLHTTP');
                } catch (e) {
                    try {
                        this.requestObject = new ActiveXObject('Microsoft.XMLHTTP');
                    } catch (e) { }
                }
            }
        }
    }
}
