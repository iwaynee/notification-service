import express from "express";
import {createSubscription} from "../controllers/subscription";

export const subscriptionRoutes = () => {
    const router = express.Router();



    router.post("/create", createSubscription)



    router.get("/test", (req, res) => {
        res.status(201).send({test: 123})
    })

    return router
}
