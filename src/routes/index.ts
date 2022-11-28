import { Express } from "express";
import { testRoutes } from "./test.routes";


function appRoutes(app: Express) {
    testRoutes(app);
};

export { appRoutes }