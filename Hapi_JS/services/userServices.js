//Import important lib
var User = require('../models/user');

//defined services
const userServices = {
    //add user
    addUser:async function(request, h){
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
    },
    //get all user
    getAllUser:async function(request, h){
        try {
            var allUsers = await User.find();
            return h.response(allUsers);
        } catch (error) {
            return h.response(error)
        }
    },
    //get specific user by id
    getUser:async function(request, h){
        try {
            var userById = await User.findById( request.params.id);
            if(!userById){
                return h.response({message: "User not found"})
            }
            return h.response(userById)
        } catch (error) {
            return h.response(error)
        }
    },
    //update specific user by id
    updateUser:async function(request, h){
        try {
            var updateUser = await User.findByIdAndUpdate(request.params.id, request.payload, {new: true});
            return h.response(updateUser);
        } catch (error) {
            return h.response(error)
        }
    },
    //delete specific user by id
    deleteUser:async function(request, h){
        try {
            var delUser = await User.findByIdAndDelete(request.params.id);
            return h.response(delUser);
        } catch (error) {
            return h.response(error);
        }
    },
}
module.exports = userServices