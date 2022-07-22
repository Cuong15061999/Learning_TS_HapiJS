import { Server } from "@hapi/hapi";
import Joi from "joi";
import { createUser, getAllUser, getUser, updateUser, deleteUser } from "../services/userServices";

const userPayload = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().required(),
})

export const userRoutes = (server: Server) => {
    server.route({
        method: "POST",
        path: "/users",
        options: {
            description: 'Create New User',
            notes: "Create New User",
            tags: ['api'],
            validate:{
                payload: userPayload
            },
        },
        handler: createUser
    });
    server.route({
        method: "GET",
        path: "/users",
        options:{
            description: 'Get All User',
            notes: 'Get All User',
            tags: ['api']
        },
        handler: getAllUser
    });
    server.route({
        method: "GET",
        path: "/users/{id}",
        options: {
            description: 'Get Specific User',
            notes: 'Get Specific User',
            tags: ['api']
        },
        handler: getUser
    });
    server.route({
        method: "PUT",
        path: "/users/{id}",
        options: {
            description: 'Update Specifuc User',
            notes: 'Update Specific User',
            tags: ['api']
        },
        handler: updateUser
    });
    server.route({
        method: "DELETE",
        path: "/users/{id}",
        options: {
            description: "DELETE SPECIFIC USER",
            notes: 'Delete Specific User',
            tags: ['api']
        },
        handler: deleteUser
    })
}