import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsEnum,
} from 'class-validator';
import { Role } from '../entities/profile.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;


  @ApiProperty({
    description: 'The role of the user in the system',
    enum: Role,
    example: Role.STUDENT,
    default: Role.GUEST,
  })
  @IsString()
  @IsEnum(Role, {
    message: 'Role must be one of: student or admin',
  })
  role: Role = Role.GUEST;
}
