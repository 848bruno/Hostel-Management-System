import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsDateString, IsNotEmpty, IsString } from 'class-validator';
export class CreateAdminDto {

  @IsNumber()
  @IsNotEmpty()
  id: number;
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsDateString()
  @IsNotEmpty()
  last_login: Date;
}
