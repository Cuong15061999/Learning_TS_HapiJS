import { Server } from "@hapi/hapi";
import Joi from "joi";
import { createUser, getAllUser, getUser, updateUser, deleteUser } from "../services/userServices";

const userPayload = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    fullName: Joi.string().required()
})
export const userRoutes = (server: Server) => {
    //create new user
    server.route({
        method: "POST",
        path: "/users",        
        options: {
            description: 'Create new user',
            notes: 'Create new user',
            tags: ['api'],
            validate: {
                payload: userPayload
            },
        },
        handler: createUser
    });
    //get all user
    server.route({
        method: "GET",
        path: "/users",
        options: {
            description: 'Create new user',
            notes: 'Create new user',
            tags: ['api'],
        },
        handler: getAllUser
    });
    //get user by id
    server.route({
        method: "GET",
        path: "/users/{id}",
        options: {
            description: 'Create new user',
            notes: 'Create new user',
            tags: ['api'],
        },
        handler: getUser
    });
    //update user by id
    server.route({
        method: "PUT",
        path: "/users/{id}",
        options: {
            description: 'Create new user',
            notes: 'Create new user',
            tags: ['api'],
        },
        handler: updateUser
    });
    //delete user by id
    server.route({
        method: "DELETE",
        path: "/users/{id}",
        options: {
            description: 'Create new user',
            notes: 'Create new user',
            tags: ['api'],
        },
        handler: deleteUser
    });
}