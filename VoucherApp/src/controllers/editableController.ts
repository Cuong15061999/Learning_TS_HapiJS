import { Server } from "@hapi/hapi";
import Joi from "joi";
import { editableMe, editableRelease, editableMaintain } from "../services/editableServices";

const editablePayload = Joi.object({
    id_User: Joi.string().required(),
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
    //
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
    //
    server.route({
        method: "POST",
        path: "/events/{event_id}/editable/maintain",
        options: {
            description: 'Reset time expired in the event',
            notes: 'Reset time expired in the event',
            tags: ['api']
        },
        handler: editableMaintain
    });
}