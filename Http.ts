/*
This file has no dependencies

Constants for HTTP verbs to avoid magic strings
Project: https://github.com/Steve-Fenton/TypeScriptUtilities
Author: Steve Fenton

Example usage:

var someAjaxAction = Http.HttpVerb.GET;
*/

module Http {
    export class HttpVerb {
        public static GET = 'GET';
        public static POST = 'POST';
        public static PUT = 'PUT';
        public static DELETE = 'DELETE';
    }
}
