import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/appError";
import { deleteContactPhoneNumberService } from "../../services/contact/deleteContactPhoneNumber.service";


export async function deleteContactPhoneNumberController(req: Request, res: Response): Promise<Response> {
    // gets user info
    const token: string | undefined = req.headers.authorization?.split(" ")[1];
    if (!token) throw new AppError(401, "missing token");
    const { username } = jwt.decode(token) as { username: string };

    // gets contact and email
    const { contactId, phoneNumberId } = req.params;
    if (!contactId) throw new AppError(400, "missing contactId");
    if (!phoneNumberId) throw new AppError(400, "missing emailId");


    await deleteContactPhoneNumberService(username, contactId, phoneNumberId);


    return res.status(204).send();
}