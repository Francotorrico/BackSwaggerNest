import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserType } from "@prisma/client";
import { LoggedInUserData } from "src/interfaces/authenticated-user.interface";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private readonly userService: UsersService){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user as LoggedInUserData;
        if(!user){
            throw new UnauthorizedException('No estás autenticado');
        }
        const foundUser = await this.userService.findOne(user.id);
        if(user.type !== UserType.ADMIN || foundUser?.type !== UserType.ADMIN){
            throw new ForbiddenException('No tienes permisos para acceder a esta ruta');
        }
        return true;
    }
}