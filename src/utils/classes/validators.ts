import { AppError } from "../../errors/appError";

export class Validators {
    static verifyConfig = {
        nameLength: 55,
        usernameLength: 64,
        passwordLength: 32,
        passwordRegex: new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
    }

    static async validateUsername(username: string, objectRepository: any): Promise<void> {
        if (username?.length > this.verifyConfig.usernameLength) {
            throw new Error(`username must have less than ${this.verifyConfig.usernameLength} charaters`);
        }
        await this.validateUsernameUniqueness(username, objectRepository);
    }

    static validatePassword(password: string): void {
        if (password?.length > this.verifyConfig.passwordLength) {
            throw new Error(`Password must have less than ${this.verifyConfig.passwordLength} characters`)
        }
        if (!this.verifyConfig.passwordRegex.test(password)) {
            throw new Error(`Password must have at least eight characters, at least one letter, one number and one special character`);
        }
    }
    static validateName(name: string): void {
        if (name?.length > this.verifyConfig.nameLength) {
            throw new Error(`Name must have less than ${this.verifyConfig.nameLength} characters`)
        }

    }

    static async validateUsernameUniqueness(username: string, objectRepository: any): Promise<void> {
        const doesClientAlreadyExists = await objectRepository.findOne({ where: { username: username } });
        if (doesClientAlreadyExists) throw new AppError(409, "username is already taken");
    }

    static validatePhoneNumber(phoneNumber: string): void {
        if (!phoneNumber) throw new AppError(400, "missing phoneNumber");
        if ((typeof phoneNumber) !== "string") throw new AppError(400, "phoneNumber must be an integer");
        const isNotNumberOnly = (/[^0-9.]/g.test(phoneNumber));
        if (isNotNumberOnly) throw new AppError(400, "phone number must be integer only")
        if (phoneNumber.length > 15) throw new AppError(400, "phoneNumber must be lower than 15 digits");

    }
}