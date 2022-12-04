import { Request, Response } from "express";
import { AppError } from "../../errors/appError";
import jwt from "jsonwebtoken";
import PDF from "pdfkit";

import { listClientService } from "../../services/client/listClient.service";

export async function createClientInfoPDFController(req: Request, res: Response): Promise<void> {
    const token: string | undefined = req.headers.authorization?.split(" ")[1];
    if (!token) throw new AppError(401, "missing token");
    const { username } = jwt.decode(token) as { username: string };

    const clientInfo = await listClientService(username);

    const stream = res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment;filename=invoice.pdf"
    });

    buildPDF(
        (chunk: any) => stream.write(chunk),
        () => stream.end(),
        clientInfo
    );
    // return res.status(200).json(username + "pdf");
}

function buildPDF(dataCallback: any, endCallback: any, clientInfo: any) {
    const doc = new PDF();
    doc.on("data", dataCallback);
    doc.on("end", endCallback);
    doc.fontSize(12)
    doc.text(JSON.stringify(clientInfo, null, 2), 100, 100);
    doc.end();
}