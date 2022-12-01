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

    let didVerificationFailed = false;

    const verifyConfig = {
        nameLength: 256,
        usernameLength: 64,
        passwordLength: 32,
        passwordRegex: new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
    }

    const errors: any = {
        name: [],
        username: [],
        password: []
    }

    const requiredData: Array<Array<string>> = [["name", name], ["username", username], ["password", password]];
    requiredData.forEach(pair => {
        const [key, value] = pair;
        if (!value) {
            didVerificationFailed = true;
            errors[key].push("Missing key");
            return;
        }
        if ((typeof value) != "string") {
            didVerificationFailed = true;
            errors[key].push("Must be a string");
            return;
        }
    })

    if (name?.length > verifyConfig.nameLength) {
        didVerificationFailed = true;
        errors.name.push(`Name must have less than ${verifyConfig.nameLength} characters`);
    }
    if (username?.length > verifyConfig.usernameLength) {
        didVerificationFailed = true;
        errors.username.push(`Username must have less than ${verifyConfig.usernameLength} charaters`);
    }
    if (password?.length > verifyConfig.passwordLength) {
        didVerificationFailed = true;
        errors.password.push(`Password must have less than ${verifyConfig.passwordLength} characters`);
    }
    if (!verifyConfig.passwordRegex.test(password)) {

        console.log(verifyConfig.passwordRegex.test(password))
        didVerificationFailed = true;
        errors.password.push(`Password must have at least eight characters, at least one letter, one number and one special character`)
    }


    if (didVerificationFailed) throw new AppError(400, errors)
}
