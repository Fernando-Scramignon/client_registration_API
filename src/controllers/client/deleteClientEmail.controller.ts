import { Request, Response } from "express";
import { AppError } from "../../errors/appError";

import jwt from "jsonwebtoken";
import { deleteClientEmailService } from "../../services/client/deleteClientEmail.service";

export async function deleteClientEmailController(req: Request, res: Response): Promise<Response> {
    let clientUsername
    try {
        const token: string = req.headers.authorization!.split(" ")[1];
        const { username } = jwt.decode(token) as { username: string };
        clientUsername = username
    } catch {
        throw new AppError(401, "missing token");
    }

    const { emailAddress } = req.params;
    if (!emailAddress) throw new AppError(400, "missing email");


    await deleteClientEmailService(clientUsername, emailAddress);

    return res.status(204).send();
}