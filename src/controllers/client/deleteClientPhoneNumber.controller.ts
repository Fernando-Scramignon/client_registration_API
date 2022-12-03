import { Request, Response } from "express";

import { AppError } from "../../errors/appError";
import jwt from "jsonwebtoken";
import { deleteClientPhoneNumberService } from "../../services/client/deleteClientPhoneNumber.service";

export async function deleteClientPhoneNumber(req: Request, res: Response): Promise<Response> {
    let clientUsername
    try {
        const token: string = req.headers.authorization!.split(" ")[1];
        const { username } = jwt.decode(token) as { username: string };
        clientUsername = username
    } catch {
        throw new AppError(401, "missing token");
    }

    const { phoneNumber } = req.params;
    if (!phoneNumber) throw new AppError(400, "missing phoneNumber");

    await deleteClientPhoneNumberService(clientUsername, phoneNumber);

    return res.status(204).send();
}