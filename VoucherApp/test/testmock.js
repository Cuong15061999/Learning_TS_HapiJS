var Mongoose = require('mongoose').Mongoose;
var mongoose = new Mongoose();
var Hapi = require('@hapi/hapi');

var MockMongoose = require('mock-mongoose').MockMongoose;
var mockMongoose = new MockMongoose(mongoose);
const { expect } = require('@hapi/code');
// const { init } = require('../src/server');

//set up server
const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});
const init = async () => {
    await server.initialize();
    return server;
};

before( () => {
    mockMongoose.prepareStorage().then(function() {
        mongoose.connect('mongodb+srv://phamvqcuong99:Quoccuong_999@cluster0.7qnaw.mongodb.net/TESTDB', function(err) {
            console.log('connected to mongo');
        });
    });
});

describe('TEST USER', function () {
    let server;

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it("TESTING", async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/'
        });
        console.log(res.statusCode)
        expect(res.statusCode).to.equal(200);
    });
});