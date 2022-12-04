import "dotenv/config"
import "express-async-errors"
import express from "express";

import { appRoutes } from "./routes";

import { errorHandlingMiddleware } from "./middlewares/errorHandling.middleware";

import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors())

appRoutes(app)
app.use(errorHandlingMiddleware)

export { app };
