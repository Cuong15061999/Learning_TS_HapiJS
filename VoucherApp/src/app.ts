import Hapi from "@hapi/hapi";
import { Server } from "@hapi/hapi";
import * as dotenv from "dotenv";
import { mongoConnect } from "./config/mongoConnect";
import inert from "@hapi/inert";
import vision from "@hapi/vision";
import hapiswagger from "hapi-swagger";
import { eventRoutes } from "./controllers/eventController"
import { voucherRoutes } from "./controllers/voucherController"
dotenv.config();

const init = async () => {
    //set up server
    const server: Server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });
    //connect to mongodb
    mongoConnect.connectDB();
    
    //set up open api swagger
    const swaggerOptions: hapiswagger.RegisterOptions ={
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
    await server.register(plugins)

    //separate routes
    eventRoutes(server)
    voucherRoutes(server)
    //start server 
    await server.start();
    console.log('Server running on %s', server.info.uri);
}

init();