import { Server } from "@hapi/hapi";
import Joi from "joi";
import { editableMe, editableRelease, editableMaintain } from "../services/editableServices";

const editablePayload = Joi.object({
    eventName: Joi.string(),
    maxQuantityVoucher: Joi.number()
})

export const editableEventRoutes = (server: Server) => {
    //create new event
    server.route({
        method: "POST",
        path: "/events/{event_id}/editable/me",
        options: {
            description: 'EDITABLE EVENT',
            notes: 'Enter to edit an event if it editable',
            tags: ['api'],
            validate: {
                payload: editablePayload,
            }
        },
        handler: editableMe
    });
    //get all events
    server.route({
        method: "POST",
        path: "/events/{event_id}/editable/release",
        options: {
            description: 'Release an event',
            notes: 'Release an event for other user to edit',
            tags: ['api']
        },
        handler: editableRelease
    });
    //get a event
    server.route({
        method: "GET",
        path: "/events/{event_id}/editable/maintain",
        options: {
            description: 'Reset time expired in the event',
            notes: 'Reset time expired in the event',
            tags: ['api']
        },
        handler: editableMaintain
    });
}