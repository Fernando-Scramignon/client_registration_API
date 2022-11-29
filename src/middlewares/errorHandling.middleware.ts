import { AppError } from "../errors/appError";

import { Response, Request, NextFunction } from "express";

export function errorHandlingMiddleware(error: AppError, req: Request, res: Response, _: NextFunction) {

    if (!(error instanceof AppError)) {
        return res.status(500).json({
            status: "error",
            code: 500,
            message: "internal server error"
        });
    };

    const { statusCode, message }: AppError = error;
    const response = {
        status: "error",
        code: statusCode,
        message: message
    };
    return res.status(statusCode).json(response);
}