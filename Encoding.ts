/*
This file has no dependencies

Base64 Encoding and Decoding
Project: https://github.com/Steve-Fenton/TypeScriptUtilities
Author: Steve Fenton

Example usage:

    var base64 = new encoding.Base64();
    var encoded = base64.encode('username:password');

*/

export class Base64 {
    private _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    encode(input: string): string {
        var output = '';
        var i = 0;
        var charA, charB, charC, encA, encB, encC, encD;

        input = this.utf8Encode(input);

        while (i < input.length) {
            charA = input.charCodeAt(i++);
            charB = input.charCodeAt(i++);
            charC = input.charCodeAt(i++);

            encA = charA >> 2;
            encB = ((charA & 3) << 4) | (charB >> 4);
            encC = ((charB & 15) << 2) | (charC >> 6);
            encD = charC & 63;

            if (isNaN(charB)) {
                encC = encD = 64;
            } else if (isNaN(charC)) {
                encD = 64;
            }

            output = output +
            this.encodeToKey(encA) +
            this.encodeToKey(encB) +
            this.encodeToKey(encC) +
            this.encodeToKey(encD);
        }

        return output;
    }

    decode(input: string): string {
        var output = '';
        var i = 0;
        var charA, charB, charC, encA, encB, encC, encD;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

        while (i < input.length) {

            encA = this.decodeFromKey(input.charAt(i++));
            encB = this.decodeFromKey(input.charAt(i++));
            encC = this.decodeFromKey(input.charAt(i++));
            encD = this.decodeFromKey(input.charAt(i++));

            charA = (encA << 2) | (encB >> 4);
            charB = ((encB & 15) << 4) | (encC >> 2);
            charC = ((encC & 3) << 6) | encD;

            output = output + String.fromCharCode(charA);

            if (encC != 64) {
                output = output + String.fromCharCode(charB);
            }
            if (encD != 64) {
                output = output + String.fromCharCode(charC);
            }

        }

        output = this.utf8Decode(output);

        return output;
    }

    private encodeToKey(position: number): string {
        return this._keyStr.charAt(position);
    }

    private decodeFromKey(char: string): number {
        return this._keyStr.indexOf(char);
    }

    private utf8Encode(input: string): string {
        var output = '';
        var i = 0;
        input = input.replace(/\r\n/g, '\n');

        for (i = 0; i < input.length; i++) {

            var c = input.charCodeAt(i);

            if (c < 128) {
                output += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                output += String.fromCharCode((c >> 6) | 192);
                output += String.fromCharCode((c & 63) | 128);
            } else {
                output += String.fromCharCode((c >> 12) | 224);
                output += String.fromCharCode(((c >> 6) & 63) | 128);
                output += String.fromCharCode((c & 63) | 128);
            }
        }

        return output;
    }

    private utf8Decode(input: string): string {
        var string = '';
        var i = 0;
        var c = 0;
        var c1 = 0;
        var c2 = 0;
        var c3 = 0;

        while (i < input.length) {

            c = input.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = input.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = input.charCodeAt(i + 1);
                c3 = input.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }
}
