import { User, IUser } from "../models/userModel";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { handleCatchError } from "./handleErrorServices/handlerCatchError";
import mongoose from "mongoose";

export const createUser = async (Request: Request, h: ResponseToolkit) => {
    try {
        var body = <IUser>Request.payload;
        var userByEmail = await User.findOne({ email : body.email})
        if(userByEmail){
            return h.response({ message: "email already be taken"});
        }
        var saveUser = await new User(body).save();
        return h.response(saveUser);
    } catch (error) {
        return handleCatchError(error);
    }
}
export const getAllUser = async (Request: Request, h: ResponseToolkit) => {
    try {
        var allUsers = await User.find();
        return h.response(allUsers).code(200);
    } catch (error) {
        return handleCatchError(error);
    }
}
export const getUser = async (Request: Request, h: ResponseToolkit) => {
    try {
        var userByID = await User.findOne({ id : Request.params.id})
        if(!userByID){
            return h.response({ message: "Can't find User"});
        }
        return h.response(userByID);
    } catch (error) {
        return handleCatchError(error);
    }
}
export const updateUser = async (Request: Request, h: ResponseToolkit) => {
    try {
        var body = <IUser>Request.payload;
        var updateUser = await User.findByIdAndUpdate(<mongoose.Types.ObjectId>Request.params.id, body, { new: true, });
        if(!updateUser){
            return h.response({ message: "User not found to update"});
        }
        return h.response(updateUser);
    } catch (error) {
        return handleCatchError(error);
    }
}
export const deleteUser = async (Request: Request, h: ResponseToolkit) => {
    try {
        var delUser = await User.findByIdAndDelete(Request.params.id);
        if(!delUser){
            return h.response({ message: "User not found to delete"});
        }
        return h.response({ message: "Delete success", delUser})
    } catch (error) {
        return handleCatchError(error)
    }
}