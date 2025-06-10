import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AtStrategy, RfStrategy } from './strategies';
import { Profile } from 'src/profile/entities/profile.entity';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Profile]),
    JwtModule.register({
      global: true,
    }), //  JwtModule with global configuration
    PassportModule, // Register PassportModule for strategies
  ],
  providers: [AuthService, AtStrategy, RfStrategy],
  controllers: [AuthController],
})
export class AuthModule { }
