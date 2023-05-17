import {Request, Response} from "express";
import {Container} from "typedi";
import {EventService} from "../services/eventService";

const eventService = Container.get(EventService)

export const getNotifications = async (req: Request, res: Response) => {

    // Get Topics
    const topic = req.query.topic
    if (topic === undefined) {
        res.status(400).json({});
        return;
    }
    const topics: string[] = String(topic).split(",")

    // Get Events for topics
    const events = await eventService.getEvents(topics)

    res.status(200).json({ notifications: events})
}
