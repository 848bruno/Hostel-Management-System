import { IsString, IsNotEmpty, IsNumber, IsDate } from "class-validator"; 
export class CreateComplainDto {
    @IsNotEmpty()
    @IsNumber()
    complainid: number;
    @IsNotEmpty()
    @IsString()
    complain: string;
    
    @IsNotEmpty()
    @IsString()
    status: string;
    
    @IsNotEmpty()
    @IsNumber()
    userid: number;
    
    @IsNotEmpty()
    @IsDate()
    createdAt: Date;
}
