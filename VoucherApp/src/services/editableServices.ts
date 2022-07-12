import { Request, ResponseToolkit } from "@hapi/hapi";
import { IEditable, editableEvent  } from "../models/editableModel";
import { Event } from "../models/eventModel";
import { handleCatchError } from "./handleErrorServices/handlerCatchError";
import { startSession } from "mongoose";
import { commitWithRetry } from "./mongoTransaction/transaction";

export const editableMe = async (request: Request, h: ResponseToolkit) => {
    try {
        //receive event_id from params and id_user from req.body
        const event_id = request.params.event_id;
        const body = <IEditable>request.payload;
        //find and check if Event exist or not
        const findEvent = await Event.findOne({ _id: event_id});
        if(!findEvent){
            return h.response({message: "can not find event. pls try again!!!"})
        }
        //find and check if Editable Event exist or not
        const findEditableEvent = await editableEvent.findOne({id_Event: event_id});
        if(!findEditableEvent){
            const newEditableEvent = new editableEvent();
            newEditableEvent.id_Event = event_id;
            newEditableEvent.id_User = body.id_User;
            newEditableEvent.editable = false;
            newEditableEvent.expired_time = new Date();
            await newEditableEvent.save();

            return h.response({message: "Your are allowed to Edit event", newEditableEvent}).code(200);
        }
        //already have
        else if(findEditableEvent && findEditableEvent.editable == true){
            const asignUser = await editableEvent.findOneAndUpdate(
                {id_Event: event_id},
                {editable: false, id_User: body.id_User},
                {new: true}
            );
            return h.response({message: "No one edit this Event. Your are allowed to Edit", asignUser}).code(200);
        }
        //some user are editting event
        else if(findEditableEvent && findEditableEvent.editable == false){
            return h.response("Some one editing this Event. Your not are allowed to Edit").code(409);
        }
    } catch (error) {
        return handleCatchError(error);
    }
}

export const editableRelease = async (request: Request, h: ResponseToolkit) => {
    try {
        //receive event_id from params
        const event_id = request.params.event_id;
        //find editable event existed or not
        const findEditAble = await editableEvent.findOne({ id_Event: event_id});
        if(!findEditAble){
            return h.response("Can not find editable event").code(400);
        }
        //check if it release or not
        else if (findEditAble.editable == true){
            return h.response("Event already released").code(400);
        }
        const releaseEvent = await editableEvent.findOneAndUpdate(
            {id_Event: event_id},
            {id_User: null, editable: true, expired_time: new Date()},
            {new: true}
        )
        return h.response({message: "Release Event Successful", releaseEvent}).code(200);
    } catch (error) {
        return handleCatchError(error);
    }
}

export const editableMaintain = async (request: Request, h: ResponseToolkit) => {
    try {
        //receive event_id from params
        const event_id = request.params.event_id;
        //find editable event exist or not
        const findEditAble = await editableEvent.findOneAndUpdate(
            {id_Event: event_id},
            {expired_time: new Date()},
            {new: true}
        )
        if(findEditAble){
            return h.response({message: "There are user editing event so the event time reset", findEditAble});
        }
        return h.response({message: "Can not find editable event"});
    } catch (error) {
        return handleCatchError(error);
    }
}