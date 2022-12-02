import { Express } from "express";

// controllers
import { createClientController } from "../controllers/client/createClient.controller";
import { loginClientController } from "../controllers/client/loginClient.controller";
import { listClientController } from "../controllers/client/listClient.controller";
import { updateClientController } from "../controllers/client/updateClient.controller";
import { deleteClientController } from "../controllers/client/deleteClient.controller";
import { createClientEmailController } from "../controllers/client/createClientEmail.controller";
import { createClientPhoneNumberController } from "../controllers/client/createClientPhoneNumber.controller";

// middlewares
import { verifyAuthMiddleware } from "../middlewares/verifyAuth.middleware";
import { deleteClientEmailController } from "../controllers/client/deleteClientEmail.controller";


export function clientRoutes(app: Express): void {
    app.post("/clients", createClientController);
    app.get("/clients", verifyAuthMiddleware, listClientController);
    app.patch("/clients", verifyAuthMiddleware, updateClientController);
    app.delete("/clients", verifyAuthMiddleware, deleteClientController);

    app.post("/clients/login", loginClientController);

    app.post("/clients/emails", verifyAuthMiddleware, createClientEmailController);
    app.delete("/clients/emails/:emailAddress", verifyAuthMiddleware, deleteClientEmailController);

    app.post("/clients/phoneNumbers", verifyAuthMiddleware, createClientPhoneNumberController);
}