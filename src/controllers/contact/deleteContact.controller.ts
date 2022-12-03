import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/appError";
import { deleteContactService } from "../../services/contact/deleteContact.service";

export async function deleteContactController(req: Request, res: Response): Promise<Response> {
    const token: string | undefined = req.headers.authorization?.split(" ")[1];
    if (!token) throw new AppError(404, "missing token");
    const { username } = jwt.decode(token) as { username: string };

    const { contactId } = req.params;
    if (!contactId) throw new AppError(400, "missing contact id");

    await deleteContactService(username, contactId);

    return res.status(204).send();
}