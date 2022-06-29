//Import important lib
var mongoose = require('mongoose');

//Create User Schema
var userSchema = new mongoose.Schema({
    email: { type: String, index: true},
    password: String,
    fullName: String,
});

var User = mongoose.model('User', userSchema);
module.exports =User;