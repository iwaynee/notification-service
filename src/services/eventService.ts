import {logger} from "../util/logger";
import {Inject, Service} from "typedi";
import {Event} from "../entities/Event";
import {SubscriptionService} from "./subscriptionService";
import {getDataSource} from "../util/databaseConnection";
import {IEvent} from "../types/IEvent";

const eventRepo = getDataSource().getMongoRepository(Event);




@Service()
class EventService {

    eventQueue: any[] = []

    constructor(
        @Inject()
        private subscriptionService: SubscriptionService
    ) {
        setInterval(() => {
            this.checkOpenEvents()
        }, 2500);
    }

    addNewEvent(event: IEvent) {
        this.eventQueue.push(event)
    }

    checkOpenEvents() {
        logger.info(`${this.eventQueue.length} open events`)

        while (this.eventQueue.length > 0) {
            const event = this.eventQueue.pop();

            // Save Event
            const e = new Event()
            e.date = event.date || new Date();
            e.topic = event.topic;
            e.type = event.type;
            e.involved_users = event.involved_users;
            e.source = event.source;
            e.content = event.content;
            e.action = event.action;
            e.save().then(() => {});

            this.subscriptionService.checkForSubscriptions(event).then(() => {});
        }
    }

    getEvents(topics: string[]){
        return eventRepo.find({
            where: {
                topic: { $in: topics }
            }
        });
    }
}



export {
    EventService
}
