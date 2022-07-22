import Hapi from "@hapi/hapi";
import { Server } from "@hapi/hapi";
import * as dotenv from "dotenv";
import { mongoConnect } from "./config/mongoConnect";
import inert from "@hapi/inert";
import vision from "@hapi/vision";
import hapiswagger from "hapi-swagger";
import { eventRoutes } from "./controllers/eventController"
import { voucherRoutes } from "./controllers/voucherController"
import { userRoutes } from "./controllers/userController";
import { editableEventRoutes } from "./controllers/editableController";
dotenv.config();
import { loginRoutes } from "./controllers/loginController";

//set up server
const server: Server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

export const start = async () => {

    //connect to mongodb
    mongoConnect.connectDB();

    //set up open api swagger
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

    //start server 
    await server.start();
    console.log('Server running on %s', server.info.uri);
}
//start();
export const init = async () => {
    //connect to mongodb
    //mongoConnect.connectDB();
    await server.initialize();
    return server;
};
//default route
server.route({
    method: 'GET',
    path: '/',
    handler: function () {
        return 'Hello World!';
    }
});
//separate routes
eventRoutes(server);
voucherRoutes(server);
userRoutes(server);
editableEventRoutes(server);
loginRoutes(server);

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});