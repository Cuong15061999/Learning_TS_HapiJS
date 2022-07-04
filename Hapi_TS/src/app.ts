import Hapi from "@hapi/hapi";
import { Server } from "@hapi/hapi";
import { mongoconnect } from "./config/mongoconnect";
import { userRoutes } from "./routes/userRoutes";

const init = async () => {
    const server: Server = Hapi.server({
        port: 3000,
        host: 'localhost',
    });
    mongoconnect.connectDB()

    //Separate routes
    userRoutes(server)

    await server.start();
    console.log('Server running on %s', server.info.uri);
    
}
init();