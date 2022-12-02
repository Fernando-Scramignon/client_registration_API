import { Request, Response } from "express";

import { deleteClientService } from "../../services/client/deleteClient.service";

import jwt from "jsonwebtoken";
import { AppError } from "../../errors/appError";


export async function deleteClientController(req: Request, res: Response) {
    let clientUsername: string
    try {
        const token: string = req.headers.authorization!.split(" ")[1];
        const { username } = jwt.decode(token) as { username: string };
        clientUsername = username
    } catch {
        throw new AppError(401, "missing token");
    }
    await deleteClientService(clientUsername);
    return res.status(204).send();
}