import { AppError } from "../../errors/appError";
import { appDataSource } from "../../data-source";

import { Client } from "../../entities/client.entity";
import { ClientEmail } from "../../entities/clientEmail.entity";

export async function deleteClientEmailService(username: string, emailAddress: string): Promise<void> {

    const clientRep = appDataSource.getRepository(Client);
    const client = await clientRep.findOne({ where: { username: username }, relations: { emails: true } });
    if (!client) throw new AppError(404, "client does not exists");

    const clientEmails = client.emails;
    const email = clientEmails.find(email => email.emailAddress == emailAddress);
    if (!email) throw new AppError(404, "email does not exists");

    const clientEmailRep = appDataSource.getRepository(ClientEmail);

    if (email.isMain && clientEmails.length > 1) {
        const newMainEmail = clientEmails[0]
        newMainEmail.isMain = true;
        clientEmailRep.save(newMainEmail);
    }


    await clientEmailRep.delete(email);

}