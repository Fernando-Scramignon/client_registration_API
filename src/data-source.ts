import { DataSource } from "typeorm";
import "dotenv/config";

export const appDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT!) : 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,

    synchronize: false,
    logging: true,
    entities: ["src/entities/*.ts"],
    migrations: ["src/migrations/*.ts"]
});