import dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

export const env = {
    app: {
        name: process.env.APP_NAME ||"",
        port: process.env.APP_PORT || "",
        host: process.env.APP_HOST || "",
        prefix: process.env.APP_PREFIX || "api",
        action_prefix: process.env.NOTIFICATION_ACTION_PREFIX || "",
        environment: process.env.NODE_ENV || "production"
    },
    db: {
        url: "mongodb://" + process.env.DB_HOST || "",
        database: process.env.DB_DATABASE || "",
        username: process.env.DB_USER || "",
        password: process.env.DB_PASSWORD || ""
    },
    twilio: {
        sid: process.env.TWILIO_SID || "",
        token: process.env.TWILIO_TOKEN || "",
        number: process.env.TWILIO_NUMBER || "",
    },
    mail: {
        email: process.env.MAIL_MAIL || "",
        password: process.env.MAIL_PASSWORD || ""
    }
}