import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsString,
  IsUUID,
  IsOptional,
  Length,
  MinLength,
} from 'class-validator';

export class UserDto {
  @ApiProperty({ example: '873c0044-c020-44c6-8279-c9df0ec57272' })
  @IsUUID()
  id: string;

  @ApiProperty({ example: 'john.doe@mail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456789', required: false, nullable: true })
  @IsOptional()
  @IsString()
  @Length(9, 15)
  telephone: string | null;

  @ApiProperty({ example: 'John', required: false, nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(2)
  firstName: string | null;

  @ApiProperty({ example: 'Doe', required: false, nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(2)
  lastName: string | null;

  @ApiProperty({ example: '2025-04-09T00:00:11.183Z' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ example: '2025-04-09T00:00:11.183Z' })
  @IsDate()
  updatedAt: Date;

  @ApiProperty({ example: 'qwerty' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'USER' })
  @IsString()
  type: 'USER' | 'ADMIN';
}
