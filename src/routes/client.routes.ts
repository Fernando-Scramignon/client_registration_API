import { Express } from "express";

import { createClientController } from "../controllers/client/createClient.controller";

export function clientRoutes(app: Express): void {
    app.post("/clients", createClientController)
}