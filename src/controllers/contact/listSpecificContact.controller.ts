import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/appError";
import { listSpecificContactService } from "../../services/contact/listSpecificContact.service";

export async function listSpecificContactController(req: Request, res: Response): Promise<Response> {
    const token: string | undefined = req.headers.authorization?.split(" ")[1];
    if (!token) throw new AppError(400, "missing token");
    const { username } = jwt.decode(token) as { username: string }

    const { contactId } = req.params;
    if (!contactId) throw new AppError(400, "missing contactId");

    const output = await listSpecificContactService(username, contactId);

    return res.status(200).json(output);
}