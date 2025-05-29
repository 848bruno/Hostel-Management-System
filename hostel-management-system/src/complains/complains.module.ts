import { Module } from '@nestjs/common';
import { ComplainsService } from './complains.service';
import { ComplainsController } from './complains.controller';

@Module({
  controllers: [ComplainsController],
  providers: [ComplainsService],
})
export class ComplainsModule {}
