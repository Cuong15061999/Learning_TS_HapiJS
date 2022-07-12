import {Document, model, Schema} from "mongoose";

export interface IEditable {
    id_Event: String,
    id_User: String,
    expired_time: Date,
    editable: Boolean
}
export interface IEditableModel extends IEditable, Document {}

const editableSchema : Schema = new Schema({
    id_Event: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true,
    },
    id_User: {
        type: Schema.Types.ObjectId,
        required: true
    },
    editable: {
        type: Boolean,
        required: true
    },
    expired_time:{
        type: Date,
        default: Date.now,
        expires: 300,
    }
});

export const editableEvent = model<IEditableModel>("EditableEvent", editableSchema);