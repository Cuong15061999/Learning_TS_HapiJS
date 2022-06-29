//Import important lib
const Hapi = require('@hapi/hapi');
var connect = require('./config/mongoConnect');
const userRoutes = require('./routes/userRoutes')
const Pack = require('./package');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');


const init = async () => {
    //Setup Server
    const server = new Hapi.Server({
        host: "localhost",
        port: 8080
    });
    //Connect to Mongodb compass
    connect.connectDB()

    //Setup swagger
    const swaggerOptions = {
        info: {
            title: 'Test API Documentation',
            version: Pack.version,
        },
    };

    //Wait for server regist swagger api
    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    //Separate Routes
    await userRoutes(server)

    //start
    await server.start();
};
init();



