const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { afterEach, beforeEach, before, describe, it } = exports.lab = Lab.script();
const { init } = require('../src/server');
const { mongoConnect } = require("../src/config/mongoConnect");
const { User, IUser } = require("../src/models/userModel");
const { ObjectId } = require('mongoose');

// const test =async () => {
//     let test_user = {
//         username:"test User",
//         password: "123456789",
//         email: "test@gmail.com"
//     }
//     const add_newUser = await new User(test_user).save();
//     console.log(add_newUser);
//     return add_newUser._id
// }

describe('TESTING CONNECT TO MONGODB AND ACCESS IN GET /', () => {
    let server;
    before(() => {
        console.log('this will do before unit test');
    })

    beforeEach(async () => {
        server = await init();
        mongoConnect.connectDB();
    });

    afterEach(async () => {
        await server.stop();
    });

    it('This Should response message hello world with code 200', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/',
        });
        expect(res.statusCode).to.equal(200);
        expect(res.payload).to.equal('Hello World!')
    });

});

describe('UNIT TEST USERS SERVICE & CONTROLLER', () => {
    let server;

    test_id_user = '62da417cf1af4b71a8392d86';

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it('This Should response all user with code 200', async () => {
        //console.log(test_id_user);
        const res = await server.inject({
            method: 'GET',
            url: '/users',
        });
        expect(res.statusCode).to.equal(200);
    });

    it('This Should response specific user with code 200', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/users/'+test_id_user,
        });
        expect(res.statusCode).to.equal(200);
        expect(res.result.email).to.equal('test@gmail.com');
    });

    it('This Should response new user with code 200', async () => {
        //req value and exept value
        var new_user = {
            username: 'PhamVQCuong',
            password: '123456',
            email: 'PhamVqCuong@gmail.com'
        }
        const res = await server.inject({
            method: 'POST',
            url: '/users',
            payload: new_user
        });
        //actual result
        const actual_result = {
            username: res.result.username,
            password: res.result.password,
            email: res.result.email
        }

        expect(res.statusCode).to.equal(200);
        expect(actual_result).to.include(new_user);

        //nhu the nay` failed test
        // expect(res.result).to.include(new_user);
        
        //nhu the nay pass test
        // expect({
        //     username: 'PhamVQCuong',
        //     password: '123456',
        //     email: 'PhamVqCuong@gmail.com',
        //     _id: new ObjectId("62d93c277d3a6c8ff1302f63"),
        //     __v: 0
        //   })
        // .to.include(new_user);
    });

    it('This Should response update user with code 200', async () => {
        //req value and exept value
        var update_user = {
            username: 'test updated',
            password: '123456',
            email: 'test@gmail.com'
        }
        const res = await server.inject({
            method: 'PUT',
            url: '/users/'+test_id_user,
            payload: update_user
        });
        //actual result
        const actual_result = {
            username: res.result.username,
            password: res.result.password,
            email: res.result.email
        }
        //unit test
        expect(res.statusCode).to.equal(200);
        expect(actual_result).to.equal(update_user);
    });

    it('This Should response message del with code 200', async () => {
        const res = await server.inject({
            method: 'DELETE',
            url: '/users/'+test_id_user,
        });
        expect(res.statusCode).to.equal(200);
        expect(res.result.message).to.equal('Delete success');
    });
});