import { IsInt, IsString } from 'class-validator';

export class CreateFeedbackDto {
  @IsInt()
  userid: number;

  @IsString()
  feedback_text: string;

  @IsInt()
  rating: number;
}
