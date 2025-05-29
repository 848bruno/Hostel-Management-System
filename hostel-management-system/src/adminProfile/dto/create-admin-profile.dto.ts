import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateAdminProfileDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @IsEmail()
  @IsNotEmpty()
  address: string;
}
