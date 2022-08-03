import { Request, Response } from "express";
import { CreateUserService } from "../service/CreateUserService";


export class CreateUserController {
    async handle(req: Request, res: Response) {
        const { name, password, email } = req.body;

        const service = new CreateUserService();

        const user    = await service.execute({
            name, 
            password, 
            email
        });

        if(user == false){
            return res.status(400).json({ err: 'User exist' }).end();
        }
        
        return res.json(user);
    }
}