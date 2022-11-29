import { DataSource } from "typeorm";
import "dotenv/config";

export const appDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT!) : 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB
});