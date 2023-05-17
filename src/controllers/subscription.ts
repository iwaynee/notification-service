import {Request, Response} from "express";
import {Container} from "typedi";
import {SubscriptionService} from "../services/subscriptionService";


const subscriptionService = Container.get(SubscriptionService);

export const createSubscription = async (req: Request, res: Response) => {
    const { subscription } = req.body;

    // check if values are right
    if (!subscription.uid || !subscription.type || !subscription.transport) {
        res.status(400).json({message: "missing parameter"})
        return;
    }

    const id = await subscriptionService.createSubscription(subscription);

    res.status(200).json({id: id})
}
