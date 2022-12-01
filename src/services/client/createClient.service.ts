import { appDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";

import { Client } from "../../entities/client.entity";
import { IClientCreation } from "../../interfaces/client.interface";

import { passwordPrunner } from "../../utils/functions/passwordPruner";
import { passwordHasher } from "../../utils/functions/passwordHasher";



export async function createClientService(data: IClientCreation): Promise<object> {
    const clientRep = appDataSource.getRepository(Client);

    await uniquenessValidator(clientRep, data);

    const hashedData: IClientCreation = await passwordHasher(data)

    const client: Client = clientRep.create(hashedData);
    await clientRep.save(client);

    const formatedClient = passwordPrunner(client);

    return formatedClient;
}

async function uniquenessValidator(dataSourceRepository: any, data: IClientCreation): Promise<void> {
    const clientAlreadyExists = await dataSourceRepository.findOne({ where: { username: data.username } })
    console.log(clientAlreadyExists)
    if (clientAlreadyExists) throw new AppError(409, "Client already exists");
}
