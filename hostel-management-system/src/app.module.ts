import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { AdminProfileModule } from './adminProfile/adminProfile.module';

@Module({
  imports: [AdminModule, AdminProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
