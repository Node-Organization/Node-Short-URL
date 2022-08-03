

import { NextFunction, Request, Response } from "express";
import { prisma } from "../prismaClient";

export async function ensureKey(req: Request, res: Response, next: NextFunction) {

    const { key } = req.params;

    if(!key){
        return res.status(400).json({ err: 'provide an access key' }).end();
    }

    const keys = await prisma.users.findUnique({
        where: {
            access: key
        }
    });

    if(!keys){
       return res.status(400).json({ err: 'Key invalited' }).end();
    }

    return next();
}