import { appDataSource } from "../../data-source";

import { Client } from "../../entities/client.entity";
import { Contact } from "../../entities/contact.entity";
import { ContactEmail } from "../../entities/contactEmail.entity";
import { ContactPhoneNumber } from "../../entities/contactPhoneNumber.entity";

import { IContactCreation } from "../../interfaces/contact.interface";

import { AppError } from "../../errors/appError";


export async function createContactService(username: string, data: IContactCreation) {
    const clientRep = appDataSource.getRepository(Client);
    const contactRep = appDataSource.getRepository(Contact);

    const client = await clientRep.findOne({ where: { username: username } });
    if (!client) throw new AppError(404, "client not found");

    const contactEmailRep = appDataSource.getRepository(ContactEmail);
    const contactPhoneNumberRep = appDataSource.getRepository(ContactPhoneNumber);

    const contact = new Contact();
    contact.name = data.name;
    contact.client = client;
    const newContact = await contactRep.save(contact);

    if (data?.emailAddress) {
        const email = new ContactEmail()
        email.emailAddress = data.emailAddress;
        email.isMain = true;
        email.contact = contact;
        await contactEmailRep.save(email);
    }
    if (data?.phoneNumber) {
        const phoneNumber = new ContactPhoneNumber();
        phoneNumber.phoneNumber = data.phoneNumber;
        phoneNumber.isMain = true;
        phoneNumber.contact = contact;
        await contactPhoneNumberRep.save(phoneNumber);
    }

    const output = await contactRep.findOne(
        {
            where: { id: newContact.id },
            relations: { phoneNumbers: true, emails: true },

        }
    )

    return output;
}