import {DataSource} from "typeorm";
import {env} from "../env";
import {logger} from "./logger";

console.log(`mongodb://${env.db.username}:${env.db.password}@${env.db.url}/?authMechanism=SCRAM-SHA-256`)

const dataSource = new DataSource({
    type: "mongodb",
    authSource: 'admin',
    database: 'nosleep_hub',
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






