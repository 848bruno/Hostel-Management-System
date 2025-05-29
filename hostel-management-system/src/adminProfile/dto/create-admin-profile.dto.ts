import { IsEmail, IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateAdminProfileDto {
  @IsNumber()
  @IsNotEmpty()

  Admin_id: number;
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
