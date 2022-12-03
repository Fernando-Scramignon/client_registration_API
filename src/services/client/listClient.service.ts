import { appDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";

import { Client } from "../../entities/client.entity";

import { passwordPrunner } from "../../utils/functions/passwordPruner";

export async function listClientService(username: string): Promise<Object> {
    const clientRep = appDataSource.getRepository(Client);
    const client = await clientRep.findOne(
        {
            where: { username: username },
            relations: { phoneNumbers: true, emails: true, contacts: { phoneNumbers: true, emails: true } }
        }
    )
    if (!client) throw new AppError(404, "client not found");
    const formatedClient = passwordPrunner(client);
    return formatedClient;
}
