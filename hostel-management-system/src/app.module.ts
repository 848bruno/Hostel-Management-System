import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import type { CacheModuleOptions } from '@nestjs/cache-manager';
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
import { CacheableMemory } from 'cacheable';
import { createKeyv, Keyv } from '@keyv/redis';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          ttl: 60000,
          stores: [
            new Keyv({
              store: new CacheableMemory({ ttl: 60000, lruSize: 5000 }),
            }),
            createKeyv(config.getOrThrow('REDIS_URL')),
          ],
        };
      },
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        throttlers: [
          {
            ttl: Number(config.getOrThrow('THROTTLE_TTL', 60)),
            limit: Number(config.getOrThrow('THROTTLE_LIMIT', 10)),
            ignoreUserAgents: [/^curl\//, /^PostmanRuntime\//],
          },
        ],
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

    // Enable caching globally
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },

    // JWT Guard
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },

    // Throttle Guard
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
