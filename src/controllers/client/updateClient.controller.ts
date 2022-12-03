import { Request, Response } from "express";
import { AppError } from "../../errors/appError";

import jwt from "jsonwebtoken";
import { updateClientService } from "../../services/client/updateClient.service";
import { IClientUpdate } from "../../interfaces/client.interface";

export async function updateClientController(req: Request, res: Response): Promise<Response> {
    // gets client username
    const token: string | undefined = req.headers.authorization?.split(" ")[1];
    if (!token) throw new AppError(401, "missing token");
    const decodeInfo = jwt.decode(token) as { decodeInfo: object }

    const { username, name, password } = req.body;
    const data: IClientUpdate = { username, name, password };
    await updateClientService(decodeInfo!, data);

    return res.status(204).send();
}