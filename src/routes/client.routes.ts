import { Express } from "express";

import { createClientController } from "../controllers/client/createClient.controller";
import { loginClientController } from "../controllers/client/loginClient.controller";

export function clientRoutes(app: Express): void {
    app.post("/clients", createClientController);
    app.post("/clients/login", loginClientController);
}