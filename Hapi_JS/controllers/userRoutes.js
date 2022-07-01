var User = require('../models/user');
var userServices = require('../services/userServices')
const Joi = require('joi');

const userRoutes = (server) => {
    //Add new user
    server.route({
        method: "POST",
        path: "/users",
        options: {
            description: "Add new user",
            notes: "Add new user",
            tags: ["api"],
            plugins: {
                "hapi-swagger": {
                    payloadType: "form",
                },
            },
            validate: {
                //validate data
                payload: Joi.object({
                    email: Joi.string().required(),
                    password: Joi.string().required(),
                    fullName: Joi.string().required()
                }),
                //fail message
                failAction: (request, h, error) => {
                    return h.response(error.details[0].message).takeover();
                }
            },
        },
        handler: (request, h) => userServices.addUser(request, h)
    });
    //Get all users
    server.route({
        method: "GET",
        path: "/users",
        options: {
            description: "GET all user",
            notes: "GET all user",
            tags: ["api"],
            plugins: {
                "hapi-swagger": {
                    payloadType: "form",
                },
            },
        },
        handler: (request, h) => userServices.getAllUser(request, h)
    })
    //Get user by id
    server.route({
        method: "GET",
        path: "/users/{id}",
        options: {
            description: "Get user by id",
            notes: "Get specific user",
            tags: ["api"],
            validate: {
                params: Joi.object({
                    id: Joi.string(),
                })
            },
            plugins: {
                "hapi-swagger": {
                    payloadType: "form",
                },
            },
        },
        handler: (request, h) => userServices.getUser(request, h)
    })
    //Update specific user
    server.route({
        method: "PUT",
        path: "/users/{id}",
        options: {
            description: "Update user",
            notes: "Update user",
            tags: ["api"],
            plugins: {
                "hapi-swagger": {
                    payloadType: "form",
                },
            },
            validate: {
                //validate data
                payload: Joi.object({
                    email: Joi.string().required(),
                    password: Joi.string().required(),
                    fullName: Joi.string().required()
                }),
                params: Joi.object({
                    id: Joi.string(),
                }),
                //fail message
                failAction: (request, h, error) => {
                    return h.response(error.details[0].message).takeover();
                }
            },
        },
        handler: async (request, h) => userServices.updateUser(request, h)
    })
    //Delete specifuc user
    server.route({
        method: "DELETE",
        path: "/users/{id}",
        options: {
            description: "Delete user",
            notes: "Delete user",
            tags: ["api"],
            validate: {
                params: Joi.object({
                    id: Joi.string(),
                })
            },
            plugins: {
                "hapi-swagger": {
                    payloadType: "form",
                },
            },
        },
        handler: async (request, h) => userServices.deleteUser(request, h)
    })

}
module.exports = userRoutes