import { Server } from "@hapi/hapi";
import { createUser, getAllUser, getUser, updateUser, deleteUser } from "../services/userServices";


export const userRoutes = (server: Server) => {
    //create new user
    server.route({
        method: "POST",
        path: "/users",
        handler: createUser
    });
    //get all user
    server.route({
        method: "GET",
        path: "/users",
        handler: getAllUser
    });
    //get user by id
    server.route({
        method: "GET",
        path: "/users/{id}",
        handler: getUser
    });
    //update user by id
    server.route({
        method: "PUT",
        path: "/users/{id}",
        handler: updateUser
    });
    //delete user by id
    server.route({
        method: "DELETE",
        path: "/users/{id}",
        handler: deleteUser
    });
}