import { Server } from "@hapi/hapi";
import { Request, ResponseToolkit } from "@hapi/hapi";
import Joi from "joi";
const loginPayload = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

export const loginRoutes = (server: Server) => {
    //create new event
    server.route({
        method: "POST",
        path: "/login",
        options: {
            description: 'Login IN ',
            notes: 'Login in app',
            tags: ['api'],
            validate: {
                payload: loginPayload,
            }
        },
        handler: (req: Request, h: ResponseToolkit) => {
            return h.response("this route handler the login, and create jwt token")
        }
    });
}