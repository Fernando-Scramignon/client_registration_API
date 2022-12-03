import { appDataSource } from "../../data-source";

import { Client } from "../../entities/client.entity";
import { ContactPhoneNumber } from "../../entities/contactPhoneNumber.entity";

import { AppError } from "../../errors/appError";

export async function deleteContactPhoneNumberService(username: string, contactId: string, phoneNumberId: string) {
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

    // looks for phoneNumber
    const phoneNumber = contact.phoneNumbers.find(number => number.id == phoneNumberId);
    if (!phoneNumber) throw new AppError(404, "phoneNumber not found");

    const contactPhoneNumberRep = appDataSource.getRepository(ContactPhoneNumber);

    // if this number is main, makes other be the main phone number
    if (phoneNumber.isMain && contact.phoneNumbers.length > 1) {
        const newMainPhone = contact.phoneNumbers[0];
        newMainPhone.isMain = true;
        contactPhoneNumberRep.save(newMainPhone);
    }

    // if phoneNumber exists, deletes it
    await contactPhoneNumberRep.delete(phoneNumber);
}