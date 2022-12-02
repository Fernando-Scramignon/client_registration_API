import { Request, Response } from "express";
import { AppError } from "../../errors/appError";

import jwt from "jsonwebtoken";

import { Validators } from "../../utils/classes/validators";

import { createClientPhoneNumberService } from "../../services/client/createClientPhoneNumber.service";

export async function createClientPhoneNumberController(req: Request, res: Response): Promise<Response> {
    const token = req.headers.authorization!.split(" ")[1]
    const { username } = jwt.decode(token) as { username: string }

    const { phoneNumber, isMain } = req.body;

    if (isMain) {
        if ((typeof isMain) !== "boolean") throw new AppError(400, "isMain must be a boolean value")
    }

    Validators.validatePhoneNumber(phoneNumber);

    const clientPhoneNumber = await createClientPhoneNumberService(username, phoneNumber, isMain);

    return res.status(201).json(clientPhoneNumber);
}