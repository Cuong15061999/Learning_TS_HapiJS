import Hapi from "@hapi/hapi";
import { Server } from "@hapi/hapi";

const init = async () => {
    const server: Server = Hapi.server({
        port: 3000,
        host: 'localhost',
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Hello World!';
        }
    });
}

init();