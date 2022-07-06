import {Document, model, Schema} from "mongoose";

export interface IVoucher {
    voucherName: String,
    voucherPass: Number,
    voucherInfo: String,
    expiredAt: Date,
    idEvent: Schema.Types.ObjectId
}
export interface IVoucherModel extends IVoucher, Document {}

const voucherSchema : Schema = new Schema({
    voucherName: {
        type: String,
        required: true,
        unique: true,
    },
    voucherPass: {
        type: Number,
        required: true
    },
    voucherInfo: {
        type: String,
        required: true
    },
    expiredAt: {
        type: Date,
        required: true
    },
    idEvent:{
        type: Schema.Types.ObjectId,
        required: true
    }
});

export const Voucher = model<IVoucherModel>("Voucher", voucherSchema);