import {DataSource} from "typeorm";
import {env} from "../env";
import {logger} from "./logger";

const dataSource = new DataSource({
    type: "mongodb",
    authSource: 'admin',
    database: env.db.database,
    url: `mongodb://${env.db.username}:${env.db.password}@${env.db.url}/`,
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






