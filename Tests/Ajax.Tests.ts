import Ajax = require('../Ajax');

export var run = () => {
    describe('Ajax', () => {
        it('gets a 200 response to a httpGet to a good address', (done) => {
            var ok = (response: XMLHttpRequest) => {
                expect(response.status).toBe(200);
                expect(response.responseText).toBe("{ value: 'Some data from a text file.' }");
                done();
            };

            var fail = (response: XMLHttpRequest) => {
                expect(response.status).toBe(200);
                done();
            };

            Ajax.httpGet('/test.txt', ok, fail);
        });

        it('gets a 404 response to a httpGet to a bad address', (done) => {
            var ok = (response: XMLHttpRequest) => {
                expect(response.status).toBe(404);
                done();
            };

            var fail = (response: XMLHttpRequest) => {
                expect(response.status).toBe(404);
                done();
            };

            Ajax.httpGet('/badaddress.txt', ok, fail);
        });
    });
};