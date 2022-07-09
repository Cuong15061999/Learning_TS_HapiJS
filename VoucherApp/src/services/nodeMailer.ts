import { handleCatchError } from "./handlerCatchError";
import { createTransport } from "nodemailer";
import { EMAIL, PASSWORD } from "../secrets/secret";
import { Voucher } from "../models/voucherModel";

//create transport server from 
export const transporter = createTransport({
    service: "Gmail",
    auth: {
        user: EMAIL,
        pass: PASSWORD,
    }
});
//Send Email function using nodemailer
export const sendEmail = async (id_voucher: string, emailTo: string) => {
    try {
        //take all voucher info mation
        const voucherInfo = await Voucher.findOne({_id: id_voucher})
        if (!voucherInfo){
            return "Can't find voucher in database"
        }
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
            to: emailTo,
            subject: " Voucher To Event xxx ",
            html: `<p>Congratulations!!!.<br> You have receive a voucher event </p></n>
                    <p> Here is your <b>Voucher Name:</b> ${voucherInfo.voucherName}</p></n>
                    <p> Here is your <b>voucher Pass:</b> ${voucherInfo.voucherPass}</p></n>
                    <p> And watch out <b>the expired day:</b> ${voucherInfo.expiredAt}</p></n>
                    <p> Wish you will enjoy out event</p></n>
                    <p> <b> Even Company Name </b> </p>`
        }
        //send email
        return transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    } catch (error) {
        return handleCatchError(error);
    }
}