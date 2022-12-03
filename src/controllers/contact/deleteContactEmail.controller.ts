import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/appError";

import { deleteContactEmailService } from "../../services/contact/deleteContactEmail.service";

export async function deleteContactEmailController(req: Request, res: Response): Promise<Response> {
    // gets user
    const token: string | undefined = req.headers.authorization?.split(" ")[1];
    if (!token) throw new AppError(401, "missing token");
    const { username } = jwt.decode(token) as { username: string }

    //gets contact id
    const { contactId, emailId } = req.params;
    if (!contactId) throw new AppError(400, "missing contactId");
    if (!emailId) throw new AppError(400, "missing emailId");


    await deleteContactEmailService(username, contactId, emailId);
    return res.status(204).send();
}