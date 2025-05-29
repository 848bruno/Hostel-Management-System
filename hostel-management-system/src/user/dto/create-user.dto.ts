import { IsEmail, IsNumber, IsNotEmpty, IsString } from 'class-validator';
export class CreateUserDto {
    @IsNotEmpty()
    @IsNumber()
    userid: number;

    @IsNotEmpty()
    @IsString()
    username: string;
    
    @IsNotEmpty()
    @IsString()
    password: string;
    
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    last_login: Date;
    
    
}