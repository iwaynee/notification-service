import {Service} from "typedi";
import {env} from "../env";
import TwilioSDK from "twilio";
import {IEvent} from "../types/IEvent";
@Service()
export class TwilioService {
    private client: TwilioSDK.Twilio;

    constructor() {
        this.client = TwilioSDK(env.twilio.sid, env.twilio.token)
    }

    sendNotification(event: IEvent, number: string) {

        const message = `${event.topic}:\n` +
                        `${event.content}\n` +
                        (event.action ? `${env.app.action_prefix}${event.action}` : "")

        this.client.messages
            .create({
                body: message,
                from: env.twilio.number,
                to: number
            })
            .then(message => console.log(message.sid))
    }
}
