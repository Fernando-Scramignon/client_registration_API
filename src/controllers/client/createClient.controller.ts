import { Request, Response } from "express";

import { createClientService } from "../../services/client/createClient.service";

export function createClientController(req: Request, res: Response) {

    const output = createClientService()
    return res.json(output)
}
