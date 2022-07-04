import { User, IUser } from "../models/user";
import { Request, ResponseToolkit } from "@hapi/hapi"
import mongoose from "mongoose";

export const handleCatchError = (error: unknown) => {
    if (typeof error === 'string'){
        return error.toUpperCase();
    }else if(error instanceof Error){
        return error.message;
    } else{
        return 'error'
    }
}
export const createUser = async (request: Request, h: ResponseToolkit) => {
    try {
        var body = <IUser>request.payload;
        var userByEmail = await User.findOne({ email: body.email });
        if (userByEmail) {
            return h.response({ message: "email already exist" });
        }
        var result = await new User(body).save();
        return h.response(result);
    } catch (error) {
        return handleCatchError(error);
    }
}
//get all user
export const getAllUser = async (request: Request, h: ResponseToolkit) => {
    try {
        var allUsers = await User.find();
        return h.response(allUsers);
    } catch (error) {
        return handleCatchError(error);
    }
}
//get specific user by id
export const getUser = async (request: Request, h: ResponseToolkit) => {
    try {
        var userById = await User.findById(<mongoose.Types.ObjectId>request.params.id);
        if (!userById) {
            return h.response({ message: "User not found" })
        }
        return h.response(userById)
    } catch (error) {
        return handleCatchError(error);
    }
} 
//update specific user by id
export const updateUser = async (request: Request, h: ResponseToolkit) => {
    try {
        var body = <IUser>request.payload;
        var updateUser = await User.findByIdAndUpdate(<mongoose.Types.ObjectId>request.params.id, body);
        if(!updateUser){
            return h.response("user not found to update");
        }
        return h.response(updateUser);
    } catch (error) {
        return handleCatchError(error);
    }
}
//delete specific user by id
export const deleteUser = async (request:Request, h: ResponseToolkit) => {
    try {
        var delUser = await User.findByIdAndDelete(request.params.id);
        if(!delUser){
            return h.response("User not found to delete")
        }
        return h.response(delUser);
    } catch (error) {
        return handleCatchError(error);
    }
}
