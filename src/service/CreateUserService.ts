
import { hash }   from 'bcryptjs'; 
import { prisma } from '../prismaClient';

interface RequestUser { 
    name:     string;
    password: string; 
    email:    string
}

export class CreateUserService {
    async execute({ name, password, email }: RequestUser) {

        const passHash = await hash(password, 8);

        const userExists = await prisma.users.findUnique({
            where: {
                email: email
            }
        });

        if(userExists){
            return false;
        }

        const characters        ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let   key               = '';        
        const charactersLength  = characters.length;

        for ( let i = 0; i < 26; i++ ) {
            key += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        const user = prisma.users.create({
            data: {
                name,
                password: passHash,
                email,
                access: key
            }
        });

        return user;
    }
}