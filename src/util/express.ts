import express from "express";
import requestLogger from "../middleware/requestLogger";
import cors from "cors";

const createApp = (): express.Application => {
    const app = express();
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(requestLogger)
    app.use(cors())
    app.disable("x-powered-by")

    /* HEALTH */
    app.get("/status", (req, res)=>{ res.status(200).json({status: "running"})})

    return app
}

export { createApp }
