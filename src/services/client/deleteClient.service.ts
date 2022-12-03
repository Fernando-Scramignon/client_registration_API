import { appDataSource } from "../../data-source";
import { Client } from "../../entities/client.entity";
import { AppError } from "../../errors/appError";

export async function deleteClientService(username: string): Promise<void> {
    const clientRep = appDataSource.getRepository(Client);
    const client = await clientRep.findOne({ where: { username: username } })
    if (!client) throw new AppError(404, "client not found");
    clientRep.delete({ username: username });

}
