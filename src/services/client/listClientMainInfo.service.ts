import { appDataSource } from "../../data-source";

import { Client } from "../../entities/client.entity";

import { AppError } from "../../errors/appError";


export async function listClientMainInfoService(username: string) {
    const clientRep = appDataSource.getRepository(Client)
    const client = await clientRep.findOne(
        {
            where: { username: username },
            relations: { emails: true, phoneNumbers: true }
        }
    );
    if (!client) throw new AppError(404, "client not found");

    if (client.emails.length == 0 && client.phoneNumbers.length == 0) {
        throw new AppError(404, "no main email or phone found");
    }
    const mainEmail = client.emails.find(email => email.isMain == true);
    const mainPhone = client.phoneNumbers.find(phoneNumber => phoneNumber.isMain == true);



    const clientMainInfo = {
        email: mainEmail,
        phone: mainPhone
    }
    return clientMainInfo;
}