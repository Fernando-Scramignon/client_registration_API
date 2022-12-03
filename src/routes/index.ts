import { Express } from "express";

// routes
import { clientRoutes } from "./client.routes";
import { contactRoutes } from "./contact.routes";

import { testRoutes } from "./test.routes";


export function appRoutes(app: Express) {
    testRoutes(app);
    clientRoutes(app);
    contactRoutes(app);
};
