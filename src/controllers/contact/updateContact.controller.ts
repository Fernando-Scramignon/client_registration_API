import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/appError";
import { updateContactService } from "../../services/contact/updateContact.service";


export async function updateContactController(req: Request, res: Response) {
    const token: string | undefined = req.headers.authorization?.split(" ")[1];
    if (!token) throw new AppError(400, "missing token");
    const { username } = jwt.decode(token) as { username: string }

    const { contactId } = req.params;
    if (!contactId) throw new AppError(400, "missing contactId");

    const { name } = req.body;
    if (!name) throw new AppError(400, "missing name key");

    const data = { name }

    await updateContactService(username, contactId, data);

    return res.status(204).send();
}