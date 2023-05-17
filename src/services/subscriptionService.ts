import {Inject, Service} from "typedi";
import {TwilioService} from "./twilioService";
import {EmailService} from "./emailService";
import {Subscription} from "../entities/Subscription";
import {getDataSource} from "../util/databaseConnection";
import {UserService} from "./userService";
import {ISubscription} from "../types/ISubscription";
import {IEvent} from "../types/IEvent";

const subscriptionRepo = getDataSource().getMongoRepository(Subscription);



@Service()
export class SubscriptionService {
    constructor(
        @Inject()
        private twilioService: TwilioService,
        @Inject()
        private emailService: EmailService,
        @Inject()
        private userService: UserService
    ) {
    }

    async createSubscription(subscription: ISubscription): Promise<number> {

        // check if there is already a uid & type combo
        let existingSub = await subscriptionRepo.findOneBy({
            $and: [{uid: subscription.uid}, {type: subscription.type}]
        });

        const entity: Subscription = existingSub || new Subscription();

        entity!.uid = subscription.uid;
        entity!.type = subscription.type;
        entity!.transport = subscription.transport;
        await entity!.save();

        return entity.id;
    }

    async removeAllSubscriptions(uid: string){
        return (await subscriptionRepo.delete({uid: uid}) ).affected
    }

    async checkForSubscriptions(event: IEvent) {

        const subscriptions = await subscriptionRepo.find({where: {type: event.type}})

        subscriptions.forEach((sub) => {
            this.userService.getUser(sub.uid)
                .then((user) => {
                    if (user) {

                        // SEND PER SMS
                        if (sub.transport.includes("sms") && user.phone) {
                            this.twilioService.sendNotification(event, user.phone);
                        }

                        // SEND PER MAIL
                        if (sub.transport.includes("email") && user.email) {
                            this.emailService.sendNotification(event, user.email);
                        }
                    }
            })
        })
    }
}
