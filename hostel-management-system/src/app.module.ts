import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { AdminProfileModule } from './adminProfile/adminProfile.module';
import { ConfigModule } from '@nestjs/config';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './logger.middleware';
import { UserModule } from './user/user.module';
import { ComplainsModule } from './complains/complains.module';
import { FeedbackModule } from './feedback/feedback.module';
import { StudentModule } from './student/student.module';
import { SeedModule } from './seed/seed.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      
      isGlobal: true,
      envFilePath: '.env',
    }),
    AdminModule, AdminProfileModule, UserModule, ComplainsModule, FeedbackModule, StudentModule, SeedModule,
  ],
 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('admin', 'adminprofile',);
  }
}
