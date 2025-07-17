import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';


export class CreateOrganizationDto {
    @ApiProperty()
    @MinLength(1,{
        message: 'Organization name must be at least 1 character'
    })

    @IsString()
    name: string;

}