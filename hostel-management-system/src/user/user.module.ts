import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ComplainsModule } from 'src/complains/complains.module';

@Module({
  imports: [DatabaseModule, UserModule,ComplainsModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
