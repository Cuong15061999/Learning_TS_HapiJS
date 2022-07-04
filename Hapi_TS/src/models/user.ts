import mongoose, {Document, Schema } from "mongoose";

export interface IUser {
    email: String;
    password: String;
    fullname: String;
}
export interface IUserModel extends IUser, Document {}

var userSchema: Schema = new mongoose.Schema({
    email: { type: String, index: true},
    password: String,
    fullName: String,
});

export const User = mongoose.model<IUserModel>('User', userSchema);