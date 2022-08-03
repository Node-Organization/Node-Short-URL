import { prisma } from "../prismaClient";

export class RedirectService {
    async execute(url:string) {

        const code = await prisma.links.findUnique({
            where: {
                code: url
            }
        });

        return code;
    }
}