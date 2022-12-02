import { Express } from "express";

// controllers
import { createClientController } from "../controllers/client/createClient.controller";
import { loginClientController } from "../controllers/client/loginClient.controller";
import { listClientController } from "../controllers/client/listClient.controller";
import { createClientEmailController } from "../controllers/client/createClientEmail.controller";
import { updateClientController } from "../controllers/client/updateClient.controller";

// middlewares
import { verifyAuthMiddleware } from "../middlewares/verifyAuth.middleware";


export function clientRoutes(app: Express): void {
    app.post("/clients", createClientController);
    app.get("/clients", verifyAuthMiddleware, listClientController);
    app.patch("/clients", verifyAuthMiddleware, updateClientController);

    app.post("/clients/login", loginClientController);

    app.post("/clients/email", verifyAuthMiddleware, createClientEmailController);

}