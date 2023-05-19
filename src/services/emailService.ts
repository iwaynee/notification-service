import {Service} from "typedi";
import {env} from "../env";
import nodemailer, {Transporter} from "nodemailer";
import {IEvent} from "../types/IEvent";
@Service()
export class EmailService {
    private client: Transporter;

    constructor() {
        this.client = nodemailer.createTransport({
            service: "hotmail",
            auth: {
                user: env.mail.email,
                pass: env.mail.password,
            },
        })
    }

    sendNotification(event: IEvent, email: string) {

        const message = `${event.topic}:\n` +
            `${event.content}\n` +
            (event.action ? `${env.app.action_prefix}${event.action}` : "")

        console.log(env.mail.email)
        console.log(env.mail.password)

        this.client.sendMail({
            from: env.mail.email,
            to: email,
            subject: "No Sleep Hub - Notification",
            text: message
        }, function(error, info) {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    }
}
