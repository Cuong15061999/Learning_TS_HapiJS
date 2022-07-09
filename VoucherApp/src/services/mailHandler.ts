import Queue from "bull";
import { sendEmail } from "./nodeMailer";
import { handleCatchError } from "./handlerCatchError";
import { Request, ResponseToolkit } from "@hapi/hapi";

interface emailPayLoad {
    id_voucher : string,
    emailTo: string,
}
const EmailQueue = new Queue("send new voucher", "redis://127.0.0.1:6379");
const options = {
    removeOnComplete: true, // removes job from queue on success
    removeOnFail: true, // removes job from queue on failure
};
export const sendmailNotify = async (req: Request, res: ResponseToolkit) => {
    try {
        const body = <emailPayLoad> req.payload;
        const id_voucher = body.id_voucher
        const emailTo = body.emailTo
        EmailQueue.add({id_voucher, emailTo}, options );
        console.log( "start queue...");
        return "Sending email about the voucher";
    } catch (error) {
        console.log(error);
        throw error;
    }
};
EmailQueue.on("global:completed", function (job, result) {
    console.log(`Job with id ${job.id} has been completed`);
});
EmailQueue.on("global:failed", async function (job, error) {
    console.log("Failed: Job-" + job.id);
});
EmailQueue.process(async (job, done) => {
    try {
        await job.progress(42);
        console.log(job.data)
        sendEmail(job.data.id_voucher, job.data.emailTo)
    } catch (error) {
        handleCatchError(error);
    } finally {
        done();
    }
});