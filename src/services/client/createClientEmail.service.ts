import { appDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";

import { Client } from "../../entities/client.entity";
import { ClientEmail } from "../../entities/clientEmail.entity";

import { passwordPrunner } from "../../utils/functions/passwordPruner";


export async function createClientEmailService(username: string, email: string, isMain: boolean) {
    const clientRep = appDataSource.getRepository(Client);
    const clientEmailRep = appDataSource.getRepository(ClientEmail);
    const client = await clientRep.findOne({ where: { username: username } });


    const doesEmailAlreadyExists = await clientEmailRep.findOne({ where: { emailAddress: email } })
    if (doesEmailAlreadyExists) throw new AppError(409, "email already exists");

    if (isMain) {
        const mainEmail = await clientEmailRep.findOne({ where: { isMain: true } })
        if (mainEmail) {
            mainEmail.isMain = false;
            clientEmailRep.save(mainEmail);
        }
    }


    const clientEmail = new ClientEmail();
    clientEmail.emailAddress = email;
    clientEmail.isMain = isMain || false;
    clientEmail.client = client!;
    // i short circuited because isMain can be undefined

    const newClientEmail = await clientEmailRep.save(clientEmail);

    const output: any = { ...newClientEmail }
    const formatedClient = passwordPrunner(output.client)

    output.client = formatedClient;
    return output
}