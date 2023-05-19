import {DataSource} from "typeorm";
import {env} from "../env";
import {logger} from "./logger";


const dataSource = new DataSource({
    type: "mongodb",
    url: env.db.url,
    username: env.db.username,
    password: env.db.password,
    database: env.db.database,
    entities: [
        env.app.environment === "production" ? "build/entities/**/*.js" : "src/entities/**/*.ts"
    ],
    synchronize: true,
    logging: false,
})

dataSource.initialize().then(( data) => {
    logger.info("connected to db");
    return data
})



export const getDataSource = () => {
    return dataSource
}






