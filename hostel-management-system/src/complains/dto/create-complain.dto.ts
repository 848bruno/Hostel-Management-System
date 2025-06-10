import { IsString, IsNotEmpty, IsNumber, IsDate } from "class-validator";
import { User } from 'src/user/entities/user.entity';
export class CreateComplainDto {

    user?: User;

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
