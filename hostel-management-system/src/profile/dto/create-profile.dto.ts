import { IsEmail, IsNotEmpty, IsNumber, IsString, IsEnum } from 'class-validator';
import { Role } from '../entities/profile.entity';



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


  @IsString()
  @IsEnum(Role, {
    message:
      'Role must be one of: student or admin',
  })
  role: Role = Role.GUEST;

}
