import "dotenv/config"
import "express-async-errors"
import express from "express";

import { appRoutes } from "./routes";

import { errorHandlingMiddleware } from "./middlewares/errorHandling.middleware";


const app = express();
app.use(express.json());

appRoutes(app)
app.use(errorHandlingMiddleware)

export { app };
