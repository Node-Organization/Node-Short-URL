import { prisma } from "../prismaClient";



export class ListUserService{
    async execute(){
        const user = await prisma.users.findMany({
            include: {
                link: true
            }
        });

        return user;
    }
}