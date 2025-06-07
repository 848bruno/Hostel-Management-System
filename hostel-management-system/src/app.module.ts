import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { CacheModule } from '@nestjs/cache-manager';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './logger.middleware';

import { AdminModule } from './admin/admin.module';
import { AdminProfileModule } from './adminProfile/adminProfile.module';
import { UserModule } from './user/user.module';
import { ComplainsModule } from './complains/complains.module';
import { FeedbackModule } from './feedback/feedback.module';
import { StudentModule } from './student/student.module';
import { SeedModule } from './seed/seed.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      // }),
      // CacheModule.register({
      //isGlobal: true,
      // ttl: 60,

    }),
    AdminModule,
    AdminProfileModule,
    UserModule,
    ComplainsModule,
    FeedbackModule,
    StudentModule,
    SeedModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('admin', 'adminprofile', 'complains', 'student', 'user', 'feedback');
  }
}
