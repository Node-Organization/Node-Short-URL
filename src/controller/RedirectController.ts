import { Request, Response } from "express";
import { RedirectService } from "../service/RedirectService";


export class RedirectController {
    async handle(req: Request, res: Response) {

        const { code } = req.params;

        const service = new RedirectService();

        const link = await service.execute(code);

        return res.redirect(link.site);
    }
}