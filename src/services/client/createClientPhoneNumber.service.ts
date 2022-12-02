import { appDataSource } from "../../data-source";

import { AppError } from "../../errors/appError";

import { Client } from "../../entities/client.entity";
import { ClientPhoneNumber } from "../../entities/clientPhoneNumber.entity";
import { passwordPrunner } from "../../utils/functions/passwordPruner";

export async function createClientPhoneNumberService(username: string, phoneNumber: string, isMain: boolean): Promise<ClientPhoneNumber> {
    const clientRep = appDataSource.getRepository(Client);
    const clientPhoneNumberRep = appDataSource.getRepository(ClientPhoneNumber);
    const client = await clientRep.findOne({ where: { username: username } });
    if (!client) throw new AppError(404, "client not found");

    const doesPhoneNumberAlreadyExists = await clientPhoneNumberRep.findOne(
        {
            where: {
                phoneNumber: phoneNumber
            }
        }
    )
    if (doesPhoneNumberAlreadyExists) throw new AppError(409, "phoneNumber already exists");

    if (isMain) {
        const mainPhone = await clientPhoneNumberRep.findOne({ where: { isMain: true } });
        if (mainPhone) {
            mainPhone.isMain = false;
            clientPhoneNumberRep.save(mainPhone);
        }
    }

    const clientPhone = new ClientPhoneNumber();
    clientPhone.phoneNumber = phoneNumber;
    clientPhone.isMain = isMain || false;
    clientPhone.client = client
    // i short circuited because isMain can be undefined

    let newClientPhone: ClientPhoneNumber
    try {
        newClientPhone = await clientPhoneNumberRep.save(clientPhone);
    } catch (error) {
        if (error instanceof Error) throw new AppError(400, error.message);
    }

    const output: any = { ...newClientPhone! };
    const formatedClient = passwordPrunner(output.client);

    output.client = formatedClient;
    return output;
}