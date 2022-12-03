import { appDataSource } from "../../data-source";
import { Client } from "../../entities/client.entity";
import { AppError } from "../../errors/appError";

export async function listContactsService(username: string) {
    const clientRep = appDataSource.getRepository(Client);
    const client = await clientRep.findOne(
        {
            where: { username: username },
            relations: { contacts: { phoneNumbers: true, emails: true } }
        }
    );
    if (!client) throw new AppError(404, "client not found");

    return client.contacts
}