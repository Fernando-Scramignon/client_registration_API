import { Express } from "express";


// controllers
import { createContactController } from "../controllers/contact/createContact.controller";
import { deleteContactController } from "../controllers/contact/deleteContact.controller";
import { listContactsController } from "../controllers/contact/listContacts.controller";
import { listSpecificContactController } from "../controllers/contact/listSpecificContact.controller";

// middlewares
import { verifyAuthMiddleware } from "../middlewares/verifyAuth.middleware";

export function contactRoutes(app: Express) {
    app.post("/contacts", verifyAuthMiddleware, createContactController);
    app.get("/contacts", verifyAuthMiddleware, listContactsController);

    app.delete("/contacts/:contactId", verifyAuthMiddleware, deleteContactController);
    app.get("/contacts/:contactId", verifyAuthMiddleware, listSpecificContactController);
}