import { Request, Response } from "express";
import { CreateLinksService } from "../service/CreateLinksService";


export class CreateLinksController {
    async handle(req: Request, res: Response) {
        const {site, user_id} = req.body;
        
        const service = new CreateLinksService();

        const links = await service.execute({
            site, 
            user_id
        });

        return res.json(links);
    }
}