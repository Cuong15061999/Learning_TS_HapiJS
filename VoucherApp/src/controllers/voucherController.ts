import { Server } from "@hapi/hapi";
import Joi from "joi";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { sendmailNotify } from "../services/mailHandler"
import { createVoucher, getAllVoucher, getVoucher, updateVoucher, deleteVoucher } from "../services/voucherService";

const voucherPayload = Joi.object({
    voucherName: Joi.string(),
    voucherPass: Joi.number(),
    voucherInfo: Joi.string().required(),
    expiredAt: Joi.string().required(),
    idEvent: Joi.string().required(),
});

export const voucherRoutes = (server: Server) => {
    //create new voucher
    server.route({
        method: "POST",
        path: "/voucher",
        options: {
            description: 'Create new voucher',
            notes: 'This route create new voucher',
            tags: ['api'],
            validate: {
                payload: voucherPayload,
            }
        },
        handler: createVoucher
    });
    //get all voucher
    server.route({
        method: "GET",
        path: "/voucher",
        options: {
            description: 'Get All Vouchers',
            notes: 'This route Get All Vouchers',
            tags: ['api']
        },
        handler: getAllVoucher
    });
    //get a event
    server.route({
        method: "GET",
        path: "/voucher/{id}",
        options: {
            description: 'GET A Voucher',
            notes: 'This route GET A Voucher',
            tags: ['api']
        },
        handler: getVoucher
    });
    //update a voucher
    server.route({
        method: "PUT",
        path: "/voucher/{id}",
        options: {
            description: 'Update a voucher',
            notes: 'This route Update a voucher',
            tags: ['api']
        },
        handler: updateVoucher
    });
    //delete voucher
    server.route({
        method: "DELETE",
        path: "/voucher/{id}",
        options: {
            description: 'Delete voucher',
            notes: 'This route delete voucher',
            tags: ['api']
        },
        handler: deleteVoucher
    });
    //sending email
    server.route({
        method: "POST",
        path: "/sendmail",
        options: {
            description: 'Delete voucher',
            notes: 'This route delete voucher',
            tags: ['api']
        },
        handler: sendmailNotify
    });
}