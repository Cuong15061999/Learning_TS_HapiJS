import {Document, model, Schema} from "mongoose";

export interface IEvent {
    eventName: String,
    maxQuantityVoucher: Number,
    remainVoucher: Number
}
export interface IEventModel extends IEvent, Document {}

const eventSchema : Schema = new Schema({
    eventName: {
        type: String,
        required: true,
        unique: true,
    },
    maxQuantityVoucher: {
        type: Number,
        required: true
    },
    remainVoucher:{
        type: Number
    }
});

export const Event = model<IEventModel>("Event", eventSchema);