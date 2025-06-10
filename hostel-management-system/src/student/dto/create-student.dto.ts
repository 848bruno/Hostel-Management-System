import { IsInt, IsDate } from 'class-validator';

export class CreateStudentDto {

  @IsInt()
  id: number;

  @IsInt()
  room_id: number;

  @IsInt()
  course_id: number;

  @IsInt()
  registration_date: number;
}
