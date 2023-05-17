import express from "express";
import {getNotifications} from "../controllers/notification";

export const notificationRoutes = () => {
    const router = express.Router();

    // api/notification?topic=project1,project2
    router.get( '/', getNotifications)


    return router
}
