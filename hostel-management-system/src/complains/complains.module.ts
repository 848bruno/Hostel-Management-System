import { Module } from '@nestjs/common';
import { ComplainsService } from './complains.service';
import { ComplainsController } from './complains.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Complain } from './entities/complain.entity';
import { Student } from 'src/student/entities/student.entity';
import { StudentModule } from 'src/student/student.module';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Complain, Student]),
    StudentModule,
  ],

  controllers: [ComplainsController],
  providers: [ComplainsService],
})
export class ComplainsModule {}
