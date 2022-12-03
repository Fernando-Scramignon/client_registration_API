import { Express } from "express";


// controllers
import { createContactController } from "../controllers/contact/createContact.controller";
import { deleteContactController } from "../controllers/contact/deleteContact.controller";

// middlewares
import { verifyAuthMiddleware } from "../middlewares/verifyAuth.middleware";

export function contactRoutes(app: Express) {
    app.post("/contacts", verifyAuthMiddleware, createContactController);
    app.delete("/contacts/:contactId", verifyAuthMiddleware, deleteContactController);
}