
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { prisma }  from "../prismaClient";

interface RequestUser{
    email:    string;
    password: string;
}

export class AuthenticateUserService{
    async execute({ email, password }:RequestUser){

        const user = await prisma.users.findUnique({
            where: {
                email: email
            }
        });

        if(!user){
            return false;
        }

        const passMatch = await compare(password, user.password);

        if(!passMatch){
            return false;
        }

        const token = sign(
            {

            },
            "45465446f5d65465fdfdf54654f6d46",
            {
                subject: user.access,
                expiresIn: '1000s'
            }
        );

        return token;
    }
}