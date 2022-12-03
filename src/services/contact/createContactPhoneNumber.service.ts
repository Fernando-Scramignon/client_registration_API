import { appDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";

import { Client } from "../../entities/client.entity";

import { IContactPhoneNumberCreation } from "../../interfaces/contact.interface";
import { ContactPhoneNumber } from "../../entities/contactPhoneNumber.entity";

export async function createContactPhoneNumberService(username: string, contactId: string, data: IContactPhoneNumberCreation) {
    // gets client
    const clientRep = appDataSource.getRepository(Client);
    const client = await clientRep.findOne(
        {
            where: { username: username },
            relations: { contacts: { phoneNumbers: true } }
        }
    )
    if (!client) throw new AppError(404, "client not found");

    // see if clients exists and belongs to client
    const contact = client.contacts.find(contact => contact.id === contactId);
    if (!contact) throw new AppError(404, "contact not found");

    const contactPhoneNumberRep = appDataSource.getRepository(ContactPhoneNumber);
    console.log(contact);
    if (data.isMain) {
        const mainEmail = await contactPhoneNumberRep.findOne({ where: { isMain: true } });
        if (mainEmail) {
            mainEmail.isMain = false;
            contactPhoneNumberRep.save(mainEmail);
        }
    }

    const contactPhoneNumber = new ContactPhoneNumber();
    contactPhoneNumber.phoneNumber = data.phoneNumber;
    contactPhoneNumber.isMain = contact.phoneNumbers.length !== 0 ? data.isMain || false : true;
    contactPhoneNumber.contact = contact;

    await contactPhoneNumberRep.save(contactPhoneNumber);
    const output = contactPhoneNumberRep.findOne({ where: { id: contactPhoneNumber.id }, relations: { contact: true } });
    return output;
}