import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { Student } from 'src/student/entities/student.entity';
import { User } from 'src/user/entities/user.entity';
import { Admin } from 'src/admin/entities/admin.entity';
import { Complain } from 'src/complains/entities/complain.entity';
import { Feedback } from 'src/feedback/entities/feedback.entity';
import { Profile } from 'src/profile/entities/profile.entity';



@Module({
  imports: [
    TypeOrmModule.forFeature([
      Student,
      Profile,
      User,
      Admin,
      Student,
      Complain,
      Feedback,
    ]),
  ],
  providers: [SeedService],
  controllers: [SeedController],
})
export class SeedModule { }
