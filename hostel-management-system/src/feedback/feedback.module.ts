import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { DatabaseModule } from 'src/database/database.module';
import { Feedback } from './entities/feedback.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/student/entities/student.entity';
import { StudentModule } from 'src/student/student.module';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Feedback, Student]),
    StudentModule,
  ],
  controllers: [FeedbackController],
  providers: [FeedbackService],
})
export class FeedbackModule {}
