import { Request, Response } from "express";

import { createClientService } from "../../services/client/createClient.service";

import { IClientCreation } from "../../interfaces/client.interface";

import { AppError } from "../../errors/appError";


export async function createClientController(req: Request, res: Response) {
    const data = req.body;
    verifyRequestClientData(data)

    const output = await createClientService(data)
    return res.status(201).json(output)
}

// if it fails, it throws an app error
function verifyRequestClientData(data: IClientCreation): void {
    const { name, username, password } = data;

    const verifyConfig = {
        nameLength: 256,
        usernameLength: 64,
        passwordLength: 32,
        passwordRegex: new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
    }

    const requiredData: Array<Array<string>> = [["name", name], ["username", username], ["password", password]];
    requiredData.forEach(pair => {
        const [key, value] = pair;
        if (!value) {
            throw new AppError(400, "Missing key: " + key);
        }
        if ((typeof value) != "string") {
            throw new AppError(400, key + " must be a string");
        }
    })

    if (name?.length > verifyConfig.nameLength) {
        throw new AppError(400, `Name must have less than ${verifyConfig.nameLength} characters`);
    }
    if (username?.length > verifyConfig.usernameLength) {
        throw new AppError(400, `Username must have less than ${verifyConfig.usernameLength} charaters`);
    }
    if (password?.length > verifyConfig.passwordLength) {
        throw new AppError(400, `Password must have less than ${verifyConfig.passwordLength} characters`);
    }
    if (!verifyConfig.passwordRegex.test(password)) {
        throw new AppError(400, `Password must have at least eight characters, at least one letter, one number and one special character`)
    }

}
