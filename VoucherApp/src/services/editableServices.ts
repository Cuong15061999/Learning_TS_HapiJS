import { Request, ResponseToolkit } from "@hapi/hapi";
import { IEditable, editableEvent  } from "../models/editableModel";
import { Event } from "../models/eventModel";
import mongoose from "mongoose";
import { handleCatchError } from "./handleErrorServices/handlerCatchError";

export const editableMe = async (request: Request, h: ResponseToolkit) => {
    try {
        return h.response("This fucntion handle /editable/me")
    } catch (error) {
        return handleCatchError(error);
    }
}

export const editableRelease = async (request: Request, h: ResponseToolkit) => {
    try {
        return h.response("This fucntion handle /editable/release")
    } catch (error) {
        return handleCatchError(error);
    }
}

export const editableMaintain = async (request: Request, h: ResponseToolkit) => {
    try {
        return h.response("This fucntion handle /editable/maintain")
    } catch (error) {
        return handleCatchError(error);
    }
}