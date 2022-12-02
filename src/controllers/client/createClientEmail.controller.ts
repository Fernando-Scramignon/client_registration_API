import { Request, Response } from "express";
import { AppError } from "../../errors/appError";
import { createClientEmailService } from "../../services/client/createClientEmail.service";
import { emailValidator } from "../../utils/functions/emailValidator";
import jwt from "jsonwebtoken";

export async function createClientEmailController(req: Request, res: Response) {
    const token = req.headers.authorization!.split(" ")[1]
    const { username } = jwt.decode(token) as { username: string }

    const { emailAddress, isMain } = req.body;

    if (isMain) {
        if ((typeof isMain) !== "boolean") throw new AppError(400, "isMain must be a boolean value")
    }

    emailValidator(emailAddress);

    const output = await createClientEmailService(username, emailAddress, isMain)
    return res.json(output);
}

