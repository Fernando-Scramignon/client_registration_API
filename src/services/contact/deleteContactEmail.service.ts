import { appDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import { Client } from "../../entities/client.entity";
import { ContactEmail } from "../../entities/contactEmail.entity";

export async function deleteContactEmailService(username: string, contactId: string, emailId: string): Promise<void> {
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

    // looks for email
    const email = contact.emails.find(email => email.id == emailId);
    if (!email) throw new AppError(404, "email not found");

    const contactEmailRep = appDataSource.getRepository(ContactEmail);

    if (email.isMain && contact.emails.length > 1) {
        const newMainEmail = contact.emails[0];
        newMainEmail.isMain = true;
        contactEmailRep.save(newMainEmail);
    }

    // if emails exists, delete email
    await contactEmailRep.delete(email);


}