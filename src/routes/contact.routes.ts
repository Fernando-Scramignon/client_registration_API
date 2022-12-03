import { Express } from "express";


// controllers
import { createContactController } from "../controllers/contact/createContact.controller";

// middlewares
import { verifyAuthMiddleware } from "../middlewares/verifyAuth.middleware";

export function contactRoutes(app: Express) {
    app.post("/contacts", verifyAuthMiddleware, createContactController);
}