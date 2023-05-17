import {Container} from "typedi";
import {EventService} from "../services/eventService";
import {Request, Response} from "express";
import {IEvent} from "../types/IEvent";

const eventService = Container.get(EventService)

export const collectEvent = (req: Request, res: Response) => {
    const { events } = req.body

    events.forEach( (event: IEvent) => {
        eventService.addNewEvent(event)
    })

    res.status(201).json({})
}
