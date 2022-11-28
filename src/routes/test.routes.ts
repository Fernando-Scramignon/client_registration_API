import { Express } from "express";
import { Request, Response } from "express";


function testRoutes(app: Express) {
    app.get("/test", (req: Request, res: Response) => {
        return res.send({ "msg": "hello world!" });
    });
};

export { testRoutes };