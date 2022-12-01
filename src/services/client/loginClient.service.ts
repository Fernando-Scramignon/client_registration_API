import { appDataSource } from "../../data-source";
import { IClientLogin } from "../../interfaces/client.interface";
import { IClientToken } from "../../interfaces/client.interface";

import { Client } from "../../entities/client.entity";

import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

import { AppError } from "../../errors/appError";
import "dotenv/config";

export async function loginClientService(data: IClientLogin): Promise<IClientToken> {
    const clientRep = appDataSource.getRepository(Client)

    const client = await clientRep.findOne({ where: { username: data.username } });
    if (!client) throw new AppError(404, "Wrong username or password");

    if (!(await compare(data.password, client.password))) throw new AppError(404, "Wrong username or password");
    const token = jwt.sign({ username: data.username }, process.env.SECRET_KEY!, { expiresIn: "1d" });

    return { token }

}