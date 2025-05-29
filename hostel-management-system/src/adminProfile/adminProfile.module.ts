import { Module } from '@nestjs/common';
import { AdminProfileService } from './adminProfile.service';
import { AdminProfileController } from './adminProfile.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminProfile } from './entities/adminProfile.entity';
import { Admin } from 'src/admin/entities/admin.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([AdminProfile, Admin])],
  controllers: [AdminProfileController],
  providers: [AdminProfileService],
})
export class AdminProfileModule {}
