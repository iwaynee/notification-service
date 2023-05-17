import express from "express";
import {collectEvent} from "../controllers/event";

export const eventRoutes = () => {
    const router = express.Router();

    // api/event/collect
    router.post("/collect", collectEvent)

    return router
}
