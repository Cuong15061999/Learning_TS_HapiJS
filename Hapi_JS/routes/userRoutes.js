var User = require('../models/user');
const Joi = require('joi');

const userRoutes = (server)=>{
    //Add new user
    server.route({
        method: "POST",
        path: "/users",
        options: {
            description: "Add new user",
            notes:"Add new user",
            tags: ["api"],
            plugins:{
                "hapi-swagger":{
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
                failAction: (request, h , error) =>{
                    return h.response(error.details[0].message).takeover();
                }
            },
        },
        handler: async (request, h) => {
            try {
                var userByEmail = await User.findOne({ email: request.payload.email });
                if (userByEmail) {
                    return h.response({ message: "email already exist" });
                }
                var result = await new User(request.payload).save();
                return h.response(result);
            } catch (error) {
                return h.response(error);
            }

        }
    });
    //Get all users
    server.route({
        method: "GET",
        path: "/users",
        options: {
            description: "GET all user",
            notes:"GET all user",
            tags: ["api"],
            plugins:{
                "hapi-swagger":{
                    payloadType: "form",
                },
            },
        },
        handler: async (request, h) =>{
            try {
                var allUsers = await User.find();
                return h.response(allUsers);
            } catch (error) {
                return h.response(error)
            }
        }
    })
    //Get user by id
    server.route({
        method: "GET",
        path: "/users/{id}",
        options: {
            description: "Get user by id",
            notes:"Get specific user",
            tags: ["api"],
            plugins:{
                "hapi-swagger":{
                    payloadType: "form",
                },
            },
        },
        handler: async (request, h) => {
            try {
                var userById = await User.findById( request.params.id);
                if(!userById){
                    return h.response({message: "User not found"})
                }
                return h.response(userById)
            } catch (error) {
                return h.response(error)
            }
        }
    })
    //Update specific user
    server.route({
        method: "PUT",
        path: "/users/{id}",
        options: {
            description: "Update user",
            notes:"Update user",
            tags: ["api"],
            plugins:{
                "hapi-swagger":{
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
                failAction: (request, h , error) =>{
                    return h.response(error.details[0].message).takeover();
                }
            },
        },
        handler: async (request, h) => {
            try {
                var updateUser = await User.findByIdAndUpdate(request.params.id, request.payload, {new: true});
                return h.response(updateUser);
            } catch (error) {
                return h.response(error)
            }
        }
    })
    //Delete specifuc user
    server.route({
        method: "DELETE",
        path: "/users/{id}",
        options:{
            description: "Update user",
            notes:"Update user",
            tags: ["api"],
            plugins:{
                "hapi-swagger":{
                    payloadType: "form",
                },
            },
        },
        handler: async (request, h) => {
            try {
                var delUser = await User.findByIdAndDelete(request.params.id);
                return h.response(delUser);
            } catch (error) {
                return h.response(error);
            }
        }
    })

}
module.exports = userRoutes