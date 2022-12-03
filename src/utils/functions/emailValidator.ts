import { AppError } from "../../errors/appError";

export function emailValidator(email: string): void {
    if (!email) throw new AppError(400, "missing key: emailAddress");

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const isEmailValid = emailRegex.test(email);
    if (!isEmailValid) throw new AppError(400, "Email is invalid");

}