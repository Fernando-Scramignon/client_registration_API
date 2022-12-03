import { appDataSource } from "../../data-source";

import { IContactUpdate } from "../../interfaces/contact.interface";

import { Client } from "../../entities/client.entity";

import { AppError } from "../../errors/appError";
import { Validators } from "../../utils/classes/validators";
import { Contact } from "../../entities/contact.entity";

export async function updateContactService(username: string, contactId: string, data: IContactUpdate): Promise<void> {
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

    try {
        Validators.validateName(data.name);
    } catch (error) {
        if (error instanceof Error) throw new AppError(400, error.message);
    }

    const contactRep = appDataSource.getRepository(Contact)
    contact.name = data.name;
    await contactRep.save(contact);

}