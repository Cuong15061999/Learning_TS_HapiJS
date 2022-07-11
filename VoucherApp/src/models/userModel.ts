import mongoose, {Document, Schema} from "mongoose";

export interface IUser {
    username: String;
    password: String;
    email: String;
}

export interface IUserModel extends IUser, Document{}

var userSchema: Schema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true}
})

export const User = mongoose.model<IUserModel>('User', userSchema);