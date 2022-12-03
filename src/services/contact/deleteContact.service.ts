import { appDataSource } from "../../data-source";

import { Client } from "../../entities/client.entity";
import { Contact } from "../../entities/contact.entity";

import { AppError } from "../../errors/appError";


export async function deleteContactService(username: string, contactId: string): Promise<void> {
    const contactRep = appDataSource.getRepository(Contact);
    const clientRep = appDataSource.getRepository(Client);
    const client = await clientRep.findOne({ where: { username: username }, relations: { contacts: true } });

    const doesContactExists = client?.contacts.find(contact => contact.id == contactId);
    if (!doesContactExists) throw new AppError(404, "contact not found");

    await contactRep.delete({ id: contactId });

}