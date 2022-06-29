//Import important lib
const Hapi = require('@hapi/hapi');
var connect = require('./config/mongoConnect');

//Setup Server
const server = new Hapi.Server({"host": "localhost","port": 8080})

//Connect to Mongodb compass
connect.connectDB()

//Separate Routes
server.start();