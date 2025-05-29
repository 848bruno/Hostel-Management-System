import { IsNumber, IsDateString, IsNotEmpty, IsString } from 'class-validator';
export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsDateString()
  @IsNotEmpty()
  last_login: Date;
}
