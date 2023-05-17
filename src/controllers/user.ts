import {Request, Response} from "express";
import {Container} from "typedi";
import {SubscriptionService} from "../services/subscriptionService";
import {UserService} from "../services/userService";

const subscriptionService = Container.get(SubscriptionService);
const userService = Container.get(UserService);


/*
{
  "user": {
    "name": "maxmustermann",
    "email": "max@example.com",
    "phone": "+41666666666"
  }
}
 */
export const createUser = async (req: Request, res: Response) => {
    const { user } = req.body;

    const entity = await userService.createUser(user);

    res.status(201).json({uid: entity.uid })
}


/*
{
  "user": {
    "uid": "5a30e5d3-85a3-4555-a19c-27d95b9b2d73",
    "name": "maxmustermann",
    "email": "max@example.com",
    "phone": "+41666666666"
  }
}
 */
export const updateUser = async (req: Request, res: Response) => {
    const { user } = req.body;

    if (!user.uid) {
        res.status(400).json({"message": "user id not valid"})
        return;
    }

    const userEn = await userService.updateUser(user)
    if (userEn === null){
        res.status(400).json({"message": "user not found"})
        return;
    }

    res.status(200).json({uid: userEn.uid})
}


/*
{
  "user": {
    "uid": "5a30e5d3-85a3-4555-a19c-27d95b9b2d73",
  }
}
 */
export const deleteUser = async (req: Request, res: Response) => {
    const { user } = req.body;

    // get user
    const deletedCount = await userService.deleteUser(user.uid)
    if (deletedCount === 0) {
        res.status(400).json({"message": "user not found"})
        return;
    }

    // delete all subscriptions
    const deleted = await subscriptionService.removeAllSubscriptions(user.uid);

    res.status(200).json({deleted: deleted})
}
