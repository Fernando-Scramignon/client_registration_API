import { Express } from "express";

// controllers
import { createClientController } from "../controllers/client/createClient.controller";
import { loginClientController } from "../controllers/client/loginClient.controller";
import { listClientController } from "../controllers/client/listClient.controller";

// middlewares
import { verifyAuthMiddleware } from "../middlewares/verifyAuth.middleware";


export function clientRoutes(app: Express): void {
    app.post("/clients", createClientController);
    app.get("/clients", verifyAuthMiddleware, listClientController);
    app.post("/clients/login", loginClientController);
}