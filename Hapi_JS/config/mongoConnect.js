//Import important lib
var mongoose = require('mongoose');
var User = require('../models/user')
require('dotenv').config();
let env_ToDeploy = process.env.ENV;

//Function Connect to Mongodb
const mongoconnect = {
    connectDB: function () {
        //check what env dev want to devploy 
        switch (env_ToDeploy) {
            case 'DEVELOPMENT':
                mongoose.connect("mongodb+srv://phamvqcuong99:Quoccuong_999@cluster0.7qnaw.mongodb.net/Learning_Hapi", { keepAlive: true, keepAliveInitialDelay: 300000 }).then(() => {
                    console.log('Database connected - Dev');
                });
                break;
            case 'PRODUCTION':
                mongoose.connect("mongodb+srv://phamvqcuong99:Quoccuong_999@cluster0.7qnaw.mongodb.net/Learning_Hapi", { keepAlive: true, keepAliveInitialDelay: 300000 }).then(() => {
                    console.log('Database connected - Product');
                });;
                break;
            default:
                throw new Error('Unknow execution environment: ' + app.get('env'));
        }
        //intial create first User in User Collection
        User.find(function (err, users) {
            if (users.length) return;
            new User({
                email: 'admin@gmail.com',
                password: 'admin',
                fullName: 'administrator',
            }).save(function (err) {
                if (err) throw err;
                console.log('First user successfully saved.');
            });
        })

    }
}
module.exports = mongoconnect