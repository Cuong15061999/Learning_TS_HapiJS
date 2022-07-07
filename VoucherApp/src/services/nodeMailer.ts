import { Request, ResponseToolkit } from "@hapi/hapi";
import { handleCatchError } from "./handlerCatchError";
import { createTransport } from "nodemailer";
import { EMAIL, PASSWORD } from "../secrets/secret";

interface emailPayLoad {
    message : string,
    emailTo: string,
}
//create transport server from 
export const transporter = createTransport({
    service: "Gmail",
    auth: {
        user: EMAIL,
        pass: PASSWORD,
    }
});
//Send Email function using nodemailer
export const sendEmail = async (request: Request, h: ResponseToolkit) => {
    try {
        const body = <emailPayLoad> request.payload;
        // verify connection configuration
        transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log("Server is ready to send messages.");
            }
        });
        //mail options
        const mailOptions = {
            from: EMAIL,
            to: body.emailTo,
            subject: " Voucher To Event xxx ",
            html: `<p>Here is your Voucher to our Event. With message: ${body.message} </p>`
        }
        //send email
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        return h.response({ message: "Voucher sended to "+ body.emailTo +" successfully." });

    } catch (error) {
        return handleCatchError(error);
    }
}