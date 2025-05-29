import { IsInt, IsDate } from 'class-validator';

export class CreateStudentDto {
  @IsInt()
  room_id: number;

  @IsInt()
  course_id: number;

  @IsDate()
  registration_date: Date;
}
