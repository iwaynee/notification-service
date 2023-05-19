import "reflect-metadata"
import express from "express";
import {Error} from "mongoose";
import * as http from "http";

import {env} from "./env";
import {logger} from "./util/logger";
import {getDataSource} from "./util/databaseConnection";
import {notificationRoutes} from "./routes/notification";
import {subscriptionRoutes} from "./routes/subscription";
import {eventRoutes} from "./routes/event";
import {createApp} from "./util/express";
import {userRoutes} from "./routes/user";


(async () => {
    logger.info("ENV: " + env.app.environment)

    /* SETUP MONGODB */
    getDataSource();

    /* SETUP EXPRESS */
    const app = createApp();

    /* ROUTES */
    const router = express.Router()
    router.use("/subscription", subscriptionRoutes())
    router.use("/notification", notificationRoutes())
    router.use("/user", userRoutes())
    router.use("/event", eventRoutes())

    app.use("/" + env.app.prefix, router);

    /* ERROR HANDLING */
    app.use((req, res) => {
        const error = new Error("not found")
        logger.error(error)
        res.status(404).json({message: error.message})
    })

    /* CREATE SERVER */
    const server = http.createServer(app)
    server.listen(env.app.port, () => {
        logger.info(`[${env.app.name}] running on port [${env.app.port}]`)
    })


    /*
    const signalTraps: NodeJS.Signals[] = ['SIGTERM', 'SIGINT', 'SIGUSR2'];
    signalTraps.forEach((type) => {
        process.once(type, async () => {
            logger.info(`process.once ${type}`);

            server.close(() => {logger.info('HTTP server closed')});
            dataSource.close().then( () => {logger.info('DB closed')})
        });
    });

     */
})();




