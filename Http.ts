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
        public static CONNECT = 'CONNECT';
        public static DELETE = 'DELETE';
        public static GET = 'GET';
        public static HEAD = 'HEAD';
        public static OPTIONS = 'OPTIONS';
        public static POST = 'POST';
        public static PUT = 'PUT';
        public static TRACE = 'TRACE';
    }
}
