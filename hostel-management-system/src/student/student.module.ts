import { Module } from '@nestjs/common';
import { StudentsService } from './student.service';
import { StudentsController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/student/entities/student.entity';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Student])],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentModule {}
