const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script();
const { init } = require('../src/server');

describe('GET /', () => {
    let server;

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it('responds users with 200', async () => 
    {
        const res = await server.inject({
            method: 'GET',
            //use url '/' is okk, but other url error time out
            //to run: npm run test3
            url: '/users'
        });
        expect(res.statusCode).to.equal(200);
    });
});