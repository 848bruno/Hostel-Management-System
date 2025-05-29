import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ComplainsModule } from 'src/complains/complains.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Complain } from 'src/complains/entities/complain.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([User,Complain]), ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
