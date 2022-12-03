import { appDataSource } from "../../data-source";
import { Client } from "../../entities/client.entity";
import { ClientPhoneNumber } from "../../entities/clientPhoneNumber.entity";
import { AppError } from "../../errors/appError";

export async function deleteClientPhoneNumberService(username: string, phoneNumber: string): Promise<void> {
    const clientRep = appDataSource.getRepository(Client);
    const client = await clientRep.findOne({ where: { username: username }, relations: { phoneNumbers: true } });
    if (!client) throw new AppError(404, "client not found");

    const clientPhoneNumbers = client.phoneNumbers;
    const phone = clientPhoneNumbers.find(phone => phone.phoneNumber == phoneNumber);
    if (!phone) throw new AppError(404, "phone number not found");
    console.log(phone)


    const clientPhoneNumberRep = appDataSource.getRepository(ClientPhoneNumber);

    if (phone.isMain && clientPhoneNumbers.length > 1) {
        const newMainPhone = clientPhoneNumbers[0];
        newMainPhone.isMain = true;
        await clientPhoneNumberRep.save(newMainPhone);
    }


    await clientPhoneNumberRep.delete({ phoneNumber: phone.phoneNumber });
}
