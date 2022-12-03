import { Request, Response } from "express";
import { listClientService } from "../../services/client/listClient.service";

import jwt from "jsonwebtoken";

export async function listClientController(req: Request, res: Response) {
    const token: string = req.headers.authorization!.split(" ")[1];
    const { username } = jwt.decode(token) as { username: string }
    const output = await listClientService(username);
    return res.json(output);
}