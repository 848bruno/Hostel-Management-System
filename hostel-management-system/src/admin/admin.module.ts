import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { DatabaseModule } from 'src/database/database.module';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AdminProfile } from 'src/adminProfile/entities/adminProfile.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Admin, AdminProfile])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
