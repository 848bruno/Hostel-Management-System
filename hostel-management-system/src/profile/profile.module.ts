import { Module } from '@nestjs/common';
import { ProfileService } from './adminProfile.service';
import { ProfileController } from './profile.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Admin } from 'src/admin/entities/admin.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Profile, Admin])],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
