import { IClientUpdate } from "../../interfaces/client.interface";

import { Client } from "../../entities/client.entity";

import { appDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";

import { hash } from "bcrypt";
import { Validators } from "../../utils/classes/validators";

export async function updateClientService(decodeInfo: any, data: IClientUpdate): Promise<void> {
    const clientRep = appDataSource.getRepository(Client);
    const client: Client | null = await clientRep.findOne({ where: { username: decodeInfo.username } });
    if (!client) throw new AppError(404, "client not found");

    try {
        if (data.name) Validators.validateName(data.name);
        if (data.password) Validators.validatePassword(data.password);
        if (data.username) Validators.validateUsername(data.username, clientRep)
    } catch (error) {
        if (error instanceof Error) throw new AppError(400, error.message)
    }

    if (data.password) data.password = await hash(data.password, 10);

    try {
        await clientRep.update(client.id, data);
    } catch (error) {
        if (error instanceof Error) throw new AppError(400, error.message);
    }

}