import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from 'generated/prisma';


@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private prisma: PrismaService,
    ){}


    public async validateUser( user : LoginDto){
        const foundUser=await this.prisma.user.findUnique({
            where:{
                email:user.email
            },
            include:{
                memberships:true
            }
        })

        if(!foundUser){return null}

        if(foundUser.password===user.password){
            return this.jwtService.sign({
                id: foundUser.id,
                email: foundUser.email,
                type: foundUser.type,
                orgs: foundUser.memberships.map((org)=> ({
                    id: org.organizationId,
                    role: org.role
                }))
            })
        }
        // esto es lo que devuelvo como respuesta con su rol
    }
}
