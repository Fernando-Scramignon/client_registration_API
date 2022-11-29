import { Express } from "express";
import { Request, Response } from "express";

import { AppError } from "../errors/appError";


// This test global error system
function testRoutes(app: Express) {
    app.get("/test", (req: Request, res: Response) => {
        return res.send({ "msg": "hello world!" });
    });
    app.get("/error", (req: Request, res: Response) => {
        throw new AppError(400, "Error is in fact working");
    })
    app.get("/uncaughtError", (req: Request, res: Response) => {
        throw new Error
    })
};

export { testRoutes };