import { Server } from "@hapi/hapi";
import Joi from "joi";
import { createEvent, getAllEvents, getEvent, updateEvent, deleteEvent } from "../services/eventServices";

const eventPayload = Joi.object({
    eventName: Joi.string().required(),
    maxQuantityVoucher: Joi.number().required()
})
export const eventRoutes = (server: Server) => {
    //create new event
    server.route({
        method: "POST",
        path: "/event",
        options: {
            description: 'Create new Event',
            notes: 'This route create new event',
            tags: ['api'],
            validate: {
                payload: eventPayload,
            }
        },
        handler: createEvent
    });
    //get all events
    server.route({
        method: "GET",
        path: "/event",
        options: {
            description: 'Get All Events',
            notes: 'This route Get All Events',
            tags: ['api']
        },
        handler: getAllEvents
    });
    //get a event
    server.route({
        method: "GET",
        path: "/event/{id}",
        options: {
            description: 'GET A Event',
            notes: 'This route GET A Event',
            tags: ['api']
        },
        handler: getEvent
    });
    //update a event
    server.route({
        method: "PUT",
        path: "/event/{id}",
        options: {
            description: 'Update a Event',
            notes: 'This route Update a Event',
            tags: ['api']
        },
        handler: updateEvent
    });
    //delete event
    server.route({
        method: "DELETE",
        path: "/event/{id}",
        options: {
            description: 'Delete Event',
            notes: 'This route delete event',
            tags: ['api']
        },
        handler: deleteEvent
    });
}

