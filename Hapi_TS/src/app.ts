import Hapi from "@hapi/hapi";
import { Server } from "@hapi/hapi";
import { mongoconnect } from "./config/mongoconnect";
import { userRoutes } from "./routes/userRoutes";
import inert from "@hapi/inert";
import vision from "@hapi/vision"
import hapiswagger from "hapi-swagger";
import { Agenda } from "agenda";
import * as dotenv from 'dotenv';
dotenv.config();

//set up agenda queue
var URL = <string>process.env.MongoURL;
const agenda = new Agenda({ db: { address: URL } });
agenda.define("report", async () => {
    console.log("connection still fine")
});

const init = async () => {
    //set up server
    const server: Server = Hapi.server({
        port: 3000,
        host: 'localhost',
    });
    //set up open API Swagger
    const swaggerOptions: hapiswagger.RegisterOptions = {
        info: {
            title: 'Test API Documentation'
        }
    };
    const plugins: Array<Hapi.ServerRegisterPluginObject<any>> = [
        {
            plugin: inert
        },
        {
            plugin: vision
        },
        {
            plugin: hapiswagger,
            options: swaggerOptions
        }
    ]
    await server.register(plugins);

    //connect DB
    mongoconnect.connectDB()

    //Agenda
    await agenda.start();
    await agenda.every("1 minute", "report");

    //bull


    //Separate routes
    userRoutes(server)

    //start server
    await server.start();
    console.log('Server running on %s', server.info.uri);

}
init();