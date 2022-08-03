import { prisma } from "../prismaClient";

interface RequestLinks{
    site:    string;
    user_id: string;
}

export class CreateLinksService {
    async execute({site, user_id}: RequestLinks) {

        const characters        ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let   key               = '';        
        const charactersLength  = characters.length;

        for ( let i = 0; i < 8; i++ ) {
            key += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        const links = prisma.links.create({
           data: {
            site, 
            code: key, 
            user_id
           }
        });

        return links;
    }
}