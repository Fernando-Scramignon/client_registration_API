import { Request, Response } from "express";

import { createContactEmailService } from "../../services/contact/createContactEmail.service";

import jwt from "jsonwebtoken";
import { emailValidator } from "../../utils/functions/emailValidator"
import { IContactEmailCreation } from "../../interfaces/contact.interface";
import { AppError } from "../../errors/appError";
import { stringify } from "querystring";


export async function createContactEmailController(req: Request, res: Response): Promise<Response> {
    // gets user
    const token: string | undefined = req.headers.authorization?.split(" ")[1];
    if (!token) throw new AppError(401, "missing token");
    const { username } = jwt.decode(token) as { username: string }

    //gets contact id
    const { contactId } = req.params;
    if (!contactId) throw new AppError(400, "missing contactId");

    // gets new email data
    const { emailAddress, isMain } = req.body;
    emailValidator(emailAddress);
    if (isMain && (typeof isMain) !== "boolean") throw new AppError(400, "isMain must be a boolean");
    const data: IContactEmailCreation = { emailAddress, isMain };

    const output = await createContactEmailService(username, contactId, data);

    return res.status(201).json(output);
}