import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './logger.middleware';

import { AdminModule } from './admin/admin.module';
import { ProfileModule } from './profile/profile.module';
import { ComplainsModule } from './complains/complains.module';
import { FeedbackModule } from './feedback/feedback.module';
import { StudentModule } from './student/student.module';
import { SeedModule } from './seed/seed.module';
import { AuthModule } from './auth/auth.module';
import { AtGuard } from './auth/guards';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CacheModule.register({ //  Register the cache module
      isGlobal: true,
      ttl: 60,
      max: 100,
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: Number(config.getOrThrow('THROTTLE_TTL')),    // in seconds
        limit: Number(config.getOrThrow('THROTTLE_LIMIT')), // number of requests
        ignoreUserAgents: [/^curl\//, /^PostmanRuntime\//],
        throttlers: [],
      }),
    }),
    AdminModule,
    ProfileModule,
    ComplainsModule,
    FeedbackModule,
    StudentModule,
    SeedModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_INTERCEPTOR',
      useClass: CacheInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        'admin',
        'profile',
        'complains',
        'student',
        'user',
        'feedback',
      );
  }
}
