/*
This file has no dependencies

Safe logging to an available console
Project: https://github.com/Steve-Fenton/TypeScriptUtilities
Author: Steve Fenton

Example usage:

Logging.Console.log('Some message');
*/

module Logging {
    export class Console {
        public static targetConsole = window.console;

        static log(message: string): void {
            if (typeof targetConsole !== 'undefined') {
                message = Console.getTimeStamp() + " " + message;
                targetConsole.log(message);
            }
        }

        private static getTimeStamp() {
            var date = new Date();
            return Console.pad(date.getHours(), 2) + ":" +
                Console.pad(date.getMinutes(), 2) + ":" +
                Console.pad(date.getSeconds(), 2) + ":" +
                Console.pad(date.getMilliseconds(), 3)
        }

        private static pad(input: number, length: number): string {
            var output = input.toString();
            while (output.length < length) {
                output = '0' + output;
            }
            return output;
        }
    }
}
