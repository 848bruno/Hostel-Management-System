import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { Student } from 'src/student/entities/student.entity';
import { AdminProfile } from 'src/adminProfile/entities/adminProfile.entity';
import { User } from 'src/user/entities/user.entity';
import { Admin } from 'src/admin/entities/admin.entity';
import { Complain } from 'src/complains/entities/complain.entity';
import { Feedback } from 'src/feedback/entities/feedback.entity';



@Module({
  imports: [
    TypeOrmModule.forFeature([
      Student,
      AdminProfile,
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
export class SeedModule {}
