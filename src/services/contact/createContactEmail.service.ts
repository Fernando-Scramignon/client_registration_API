import { appDataSource } from "../../data-source";

import { Client } from "../../entities/client.entity";
import { ContactEmail } from "../../entities/contactEmail.entity";

import { AppError } from "../../errors/appError";
import { IContactEmailCreation } from "../../interfaces/contact.interface";

export async function createContactEmailService(username: string, contactId: string, data: IContactEmailCreation) {
    // gets client
    const clientRep = appDataSource.getRepository(Client);
    const client = await clientRep.findOne(
        {
            where: { username: username },
            relations: { contacts: { emails: true } }
        }
    )
    if (!client) throw new AppError(404, "client not found");

    // see if clients exists and belongs to client
    const contact = client.contacts.find(contact => contact.id === contactId);
    if (!contact) throw new AppError(404, "contact not found");

    const contactEmailRep = appDataSource.getRepository(ContactEmail);

    // checks if main email property should be replaced
    if (data.isMain) {
        const mainEmail = await contactEmailRep.findOne({ where: { isMain: true } });
        if (mainEmail) {
            mainEmail.isMain = false;
            contactEmailRep.save(mainEmail);
        }
    }

    // creates contact email
    const contactEmail = new ContactEmail();
    contactEmail.emailAddress = data.emailAddress;
    contactEmail.isMain = contact.emails.length !== 0 ? data.isMain || false : true;
    contactEmail.contact = contact


    await contactEmailRep.save(contactEmail);
    const output = contactEmailRep.findOne({ where: { id: contactEmail.id }, relations: { contact: true } });
    return output;
}