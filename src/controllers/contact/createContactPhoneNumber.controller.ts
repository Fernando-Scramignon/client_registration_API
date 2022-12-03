import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/appError";
import { IContactPhoneNumberCreation } from "../../interfaces/contact.interface";

import { createContactPhoneNumberService } from "../../services/contact/createContactPhoneNumber.service";

import { Validators } from "../../utils/classes/validators";

export async function createContactPhoneNumberController(req: Request, res: Response): Promise<Response> {
    // gets user
    const token: string | undefined = req.headers.authorization?.split(" ")[1];
    if (!token) throw new AppError(401, "missing token");
    const { username } = jwt.decode(token) as { username: string }

    //gets contact id
    const { contactId } = req.params;
    if (!contactId) throw new AppError(400, "missing contactId");

    const { phoneNumber, isMain } = req.body;

    Validators.validatePhoneNumber(phoneNumber);

    if (isMain) {
        if ((typeof isMain) !== "boolean") throw new AppError(400, "isMain must be a boolean value")
    }

    const data: IContactPhoneNumberCreation = { phoneNumber, isMain }

    const output = await createContactPhoneNumberService(username, contactId, data);


    return res.status(201).json(output);
}