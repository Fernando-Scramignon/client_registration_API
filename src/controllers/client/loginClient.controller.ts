import { Request, Response } from "express";

import { loginClientService } from "../../services/client/loginClient.service";

import { IClientLogin, IClientToken } from "../../interfaces/client.interface";
import { AppError } from "../../errors/appError";

import "dotenv/config"

export async function loginClientController(req: Request, res: Response): Promise<Response> {
    const data: IClientLogin = req.body;
    verifyLoginData(data);
    const token: IClientToken = await loginClientService(data);
    return res.status(200).json(token);
}


function verifyLoginData(data: IClientLogin): void {
    const { username, password } = data;

    if (!username || !password) throw new AppError(400, "username and password are required");

    if ((typeof username !== "string")) throw new AppError(400, "username must be a string");
    if ((typeof password !== "string")) throw new AppError(400, "password must be string");

    if (password.length > 32) throw new AppError(400, "password must be less than 32 characters");
    if (username.length > 256) throw new AppError(400, "username must be less than 256 characters");
}
