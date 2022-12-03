import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/appError";
import { listContactsService } from "../../services/contact/listContacts.service";

export async function listContactsController(req: Request, res: Response): Promise<Response> {
    const token: string | undefined = req.headers.authorization?.split(" ")[1];
    if (!token) throw new AppError(400, "missing token");
    const { username } = jwt.decode(token) as { username: string }

    const output = await listContactsService(username);

    return res.status(200).json(output);
}