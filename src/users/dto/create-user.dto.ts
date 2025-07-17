import { ApiProperty } from '@nestjs/swagger';
import { UserType } from '@prisma/client';


export class CreateUserDto {

    @ApiProperty({ required: true })
    email: string;
    @ApiProperty({ required: true })
    firstName: string;

    @ApiProperty({ required: true })
    lastName?: string;

    @ApiProperty({ required: true })
    password: string;
    @ApiProperty({ required: true })
    telephone?: string;
    @ApiProperty({ required: false,default:'USER' })
    type?: UserType='USER';

}
