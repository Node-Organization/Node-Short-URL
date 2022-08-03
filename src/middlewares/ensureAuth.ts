import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IsPayload{
    sub: string;
}

export function ensureAuth(req: Request, res: Response, next: NextFunction){

    const authToken = req.headers.authorization;

    if(!authToken){
        return res.json({ err: 'Token not exists' }).status(400).end();
    }

    const [ bearer, token ] = authToken.split(" ");

    try {

        const result = verify(token, "45465446f5d65465fdfdf54654f6d46") as IsPayload;

        req.user_access = result.sub;

        return next();

    } catch (error) {
        return res.status(400).json({ err: 'Error token authenticated' }).end();
    }
}