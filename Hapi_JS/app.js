//Import important lib
const Hapi = require('@hapi/hapi');
var connect = require('./config/mongoConnect');
const userRoutes = require('./routes/userRoutes')
const Pack = require('./package');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Agenda = require("agenda");
const agenda = new Agenda({ db: { address: "mongodb+srv://phamvqcuong99:Quoccuong_999@cluster0.7qnaw.mongodb.net/Learning_Hapi" } });
agenda.define("report", async (job) => {
    console.log("connection still fine")
});
const Queue = require('bull');
const videoQueue = new Queue('video transcoding', 'redis://127.0.0.1:6379');

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

    //bull test
    await videoQueue.process(function (job, done) {
        // transcode video asynchronously and report progress
        job.progress(42);

        // call done when finished
        done();

        // or give an error if error
        done(new Error('error transcoding'));

        // or pass it a result
        done(null, { framerate: 29.5 /* etc... */ });
        throw new Error('some unexpected error');
    });
    await videoQueue.add({ video: 'http://example.com/video1.mov' });

    //Separate Routes
    userRoutes(server)

    //start
    await server.start();
};
init();



