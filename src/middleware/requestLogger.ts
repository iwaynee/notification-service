import { Request, Response, NextFunction } from 'express';
import {logger} from "../util/logger";

export default function requestLogger(req: Request, res: Response, next: NextFunction) {
    logger.info(`Incoming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`)

    /*
    res.on('finish', () => {
        logger.info(`Response -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] Status: [${res.statusCode}]`)
    })

     */
    next();
};
