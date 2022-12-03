import { Express } from "express";


// controllers
import { createContactController } from "../controllers/contact/createContact.controller";
import { createContactEmailController } from "../controllers/contact/createContactEmail.controller";
import { deleteContactController } from "../controllers/contact/deleteContact.controller";
import { deleteContactEmailController } from "../controllers/contact/deleteContactEmail.controller";
import { listContactsController } from "../controllers/contact/listContacts.controller";
import { listSpecificContactController } from "../controllers/contact/listSpecificContact.controller";
import { updateContactController } from "../controllers/contact/updateContact.controller";

// middlewares
import { verifyAuthMiddleware } from "../middlewares/verifyAuth.middleware";

export function contactRoutes(app: Express) {
    app.post("/contacts", verifyAuthMiddleware, createContactController);
    app.get("/contacts", verifyAuthMiddleware, listContactsController);

    app.delete("/contacts/:contactId", verifyAuthMiddleware, deleteContactController);
    app.get("/contacts/:contactId", verifyAuthMiddleware, listSpecificContactController);
    app.patch("/contacts/:contactId", verifyAuthMiddleware, updateContactController);

    app.post("/contacts/:contactId/emails", verifyAuthMiddleware, createContactEmailController);
    app.delete("/contacts/:contactId/emails/:emailId", verifyAuthMiddleware, deleteContactEmailController);
}