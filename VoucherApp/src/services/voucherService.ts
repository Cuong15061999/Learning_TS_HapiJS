import { Request, ResponseToolkit } from "@hapi/hapi";
import { IVoucher, Voucher } from "../models/voucherModel";
import { Event } from "../models/eventModel";
import mongoose from "mongoose";
import { handleCatchError } from "./handlerCatchError";

export const createVoucher = async (request: Request, h: ResponseToolkit) => {
    try {
        
        var body = <IVoucher>request.payload;
        var checkVoucher = await Voucher.findOne({voucherName: body.voucherName});
        if(checkVoucher){
            return h.response({message: "voucher name already be created"});
        }
        var findEvent = await Event.findOneAndUpdate
            ({_id: body.idEvent, remainVoucher: { $gt: 0}}, 
            {$inc: { remainVoucher: -1} },
            { new: true})
        if(findEvent){
            const newVoucher = await new Voucher({
                voucherName: body.voucherName,
                voucherPass: Math.floor(100000 + Math.random() * 900000),
                voucherInfo: body.voucherInfo,
                expiredAt: body.expiredAt,
                idEvent: body.idEvent
            }).save()
            return h.response(newVoucher);
        }
        return h.response({message: "Can not find your event id or remain event is 0 "});
    } catch (error) {
        return handleCatchError(error);
    }
}
export const getAllVoucher = async (request: Request, h: ResponseToolkit) => {
    try {
        var allVoucher = await Voucher.find();
        return h.response(allVoucher);
    } catch (error) {
        return handleCatchError(error);
    }
}
export const getVoucher = async (request: Request, h: ResponseToolkit) => {
    try {
        var voucherID = await Voucher.findById(<mongoose.Types.ObjectId>request.params.id);
        if(!voucherID){
            return h.response({message: "Can not find a voucher"}).code(409);
        }
        return h.response(voucherID).code(200);
    } catch (error) {
        return handleCatchError(error);
    }
}
export const updateVoucher = async (request: Request, h: ResponseToolkit) => {
    try {
        var body = <IVoucher>request.payload;
        var updateVoucher = await Voucher.findByIdAndUpdate(<mongoose.Types.ObjectId>request.params.id, body, {new: true,});
        if(!updateVoucher){
            return h.response({message: "Can not find voucher you want to update"}).code(409);
        }
        return h.response(updateVoucher).code(201);
    } catch (error) {
        return handleCatchError(error);
    }
}
export const deleteVoucher = async (request: Request, h: ResponseToolkit) => {
    try {
        var delVoucher = await Voucher.findByIdAndDelete(<mongoose.Types.ObjectId>request.params.id)
        if(delVoucher){
            return h.response({message: " Delete successfully", data: delVoucher,}).code(200);
        }
        return h.response({message: "Can not find voucher to delete"}).code(409);
    } catch (error) {
        return handleCatchError(error);
    }
}