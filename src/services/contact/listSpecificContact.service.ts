import { appDataSource } from "../../data-source";
import { Client } from "../../entities/client.entity";
import { AppError } from "../../errors/appError";

export async function listSpecificContactService(username: string, contactId: string) {
    const clientRep = appDataSource.getRepository(Client);
    const client = await clientRep.findOne(
        {
            where: { username: username },
            relations: { contacts: { emails: true, phoneNumbers: true } }
        }
    )
    if (!client) throw new AppError(404, "client not found");

    const contact = client.contacts.find(contact => contact.id == contactId);
    if (!contact) throw new AppError(404, "contact not found");

    return contact;
}