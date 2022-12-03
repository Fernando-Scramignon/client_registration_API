import { hash } from "bcrypt";
import { Client } from "../../entities/client.entity";
import { IClientCreation } from "../../interfaces/client.interface";

export async function passwordHasher(entityObject: any): Promise<IClientCreation> {
    const hashedPassword = await hash(entityObject.password, 10);
    const output: IClientCreation = {
        name: entityObject.name,
        username: entityObject.username,
        password: hashedPassword
    }
    // const output: any = { ...entityObject, password: hashedPassword }
    return output;
}