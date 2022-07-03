//Import important lib
var connect = require('./config/mongoConnect');
const Hapi = require('@hapi/hapi');
const userRoutes = require('./controllers/userRoutes')
const Pack = require('./package');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Agenda = require("agenda");
const MongoUrl = process.env.MongoCN;
const agenda = new Agenda({ db: { address: MongoUrl } });
agenda.define("report", async (job) => {
    console.log("connection still fine")
});

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
    //agenda connection report every 1 minute
    await agenda.start();
    await agenda.every("1 minute", "report");

    //Separate Routes
    userRoutes(server)

    //start
    await server.start();
};
init();



