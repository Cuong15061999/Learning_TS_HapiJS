import { Request, ResponseToolkit } from "@hapi/hapi";
import { IEvent, Event } from "../models/eventModel";
import { Voucher } from "../models/voucherModel";
import mongoose from "mongoose";
import { handleCatchError } from "./handlerCatchError";

export const createEvent = async (request: Request, h: ResponseToolkit) => {
    try {
        var body = <IEvent> request.payload;
        var findEvent = await Event.findOne({ eventName: body.eventName})
        if(findEvent){
            return h.response({message: "This event name already exist"}).code(409);
        }
        var newEvent = new Event(body)
        newEvent.remainVoucher = body.maxQuantityVoucher;

        await newEvent.save();
        return h.response(newEvent).code(201);
    } catch (error) {
        return handleCatchError(error);
    }
}

export const getAllEvents = async (request: Request, h: ResponseToolkit) => {
    try {
        var allEvent = await Event.find();
        return h.response(allEvent).code(200);
    } catch (error) {
        return handleCatchError(error);
    }
}

export const getEvent = async (request: Request, h: ResponseToolkit) => {
    try {
        var eventID = await Event.findById(<mongoose.Types.ObjectId>request.params.id);
        if(!eventID){
            return h.response({message: "Can not find a event"}).code(409);
        }
        return h.response(eventID).code(200);
    } catch (error) {
        return handleCatchError(error);
    }
}

export const updateEvent = async (request: Request, h: ResponseToolkit) => {
    try {
        var body = <IEvent> request.payload;
        var updateEvent = await Event.findByIdAndUpdate(<mongoose.Types.ObjectId>request.params.id, body, {new: true,});
        if(!updateEvent){
            return h.response({message: "Can not find Event you want to update"}).code(409);
        }
        return h.response(updateEvent).code(201);
    } catch (error) {
        return handleCatchError(error);
    }
}

export const deleteEvent = async (request: Request, h: ResponseToolkit) => {
    try {
        var delEvent = await Event.findByIdAndDelete(<mongoose.Types.ObjectId>request.params.id)
        if(delEvent){
            //also delete all voucher of this event
            const delAllVoucher = await Voucher.deleteMany({idEvent: request.params.id})
            return h.response({message: " Delete successfully", data: delEvent, delAllVoucher: delAllVoucher}).code(200);
        }
        return h.response({message: "Can not find event to delete"}).code(409);
    } catch (error) {
        return handleCatchError(error);
    }
}