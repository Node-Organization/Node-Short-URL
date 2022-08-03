
import { Request, Response } from "express";
import { AuthenticateUserService } from "../service/AuthenticateUserService";

export class AuthenticateUserController{
    async handle(req: Request, res: Response){

        const { email, password } = req.body;

        const service = new AuthenticateUserService();

        const user = await service.execute({ email, password });

        if(user == false){
            return res.status(400).json({ err: 'Email is password invalited' }).end();
        }

        return res.json(user);
    }
}