import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/appError";
import { listClientMainInfoService } from "../../services/client/listClientMainInfo.service";

export async function listClientMainInfoController(req: Request, res: Response): Promise<Response> {
    const token: string | undefined = req.headers.authorization?.split(" ")[1];
    if (!token) throw new AppError(401, "missing authorization");
    const { username } = jwt.decode(token) as { username: string };

    const output = await listClientMainInfoService(username);

    return res.status(200).json(output);
}