import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { AppError } from "../../errors/appError";

import { Validators } from "../../utils/classes/validators";
import { emailValidator } from "../../utils/functions/emailValidator";

import { createContactService } from "../../services/contact/createContact.service";
import { IContactCreation } from "../../interfaces/contact.interface";

export async function createContactController(req: Request, res: Response): Promise<Response> {
    const token: string | undefined = req.headers.authorization?.split(" ")[1];
    if (!token) throw new AppError(401, "missing token");
    const { username } = jwt.decode(token) as { username: string }

    const { name, emailAddress, phoneNumber } = req.body;

    validateContactCreationData(name, emailAddress, phoneNumber);
    const data: IContactCreation = { name, emailAddress, phoneNumber }

    const output = await createContactService(username, data);


    return res.status(200).json(output);
}

function validateContactCreationData(name: string, email: string, phoneNumber: string) {
    if (!name) throw new AppError(400, "name is a required field");

    if (!email && !phoneNumber) throw new AppError(400, "at least one email or one phone number is required");

    if (email && typeof email !== "string") throw new AppError(400, "email must be a string");
    if (phoneNumber && typeof phoneNumber !== "string") throw new AppError(400, "phoneNumbers must be a array");

    if (phoneNumber) Validators.validatePhoneNumber(phoneNumber);
    if (email) emailValidator(email);
}