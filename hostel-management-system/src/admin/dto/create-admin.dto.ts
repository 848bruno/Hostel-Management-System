import { IsNumber, IsDateString, IsNotEmpty, IsString } from 'class-validator';
export class CreateAdminDto {
  @IsNumber()
  @IsNotEmpty()
  Admin_id: number;
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsDateString()
  @IsNotEmpty()
  last_login: Date;
}
