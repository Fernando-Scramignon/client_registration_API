import { ContactEmail } from "../entities/contactEmail.entity";
import { ContactPhoneNumber } from "../entities/contactPhoneNumber.entity";

export interface IContactCreation {
    name: string,
    emailAddress: string,
    phoneNumber: string
}