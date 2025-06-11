import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as Bcrypt from 'bcrypt';
import { CreateAuthDto } from './dto/login.dto';
import { Profile, Role } from 'src/profile/entities/profile.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) { }

  // Hash data using bcrypt
  private async hashData(data: string): Promise<string> {
    const salt = await Bcrypt.genSalt(10);
    return await Bcrypt.hash(data, salt);
  }

  // Save hashed refresh token in DB
  private async saveRefreshToken(id: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.profileRepository.update(id, { hashedRefreshToken });
  }

  // Generate access and refresh tokens with role
  private async getTokens(id: number, email: string, role: Role) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: id, email, role },
        {
          secret: this.configService.getOrThrow<string>('JWT_ACCESS_TOKEN_SECRET'),
          expiresIn: this.configService.getOrThrow<string>('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
        },
      ),
      this.jwtService.signAsync(
        { sub: id, email, role },
        {
          secret: this.configService.getOrThrow<string>('JWT_REFRESH_TOKEN_SECRET'),
          expiresIn: this.configService.getOrThrow<string>('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
        },
      ),
    ]);
    return { accessToken, refreshToken };
  }

  // Sign in user
  async signIn(createAuthDto: CreateAuthDto) {
    const foundUser = await this.profileRepository.findOne({
      where: { email: createAuthDto.email },
      select: ['id', 'email', 'password', 'role'],
    });

    if (!foundUser) {
      throw new NotFoundException(`User with email ${createAuthDto.email} not found`);
    }

    const passwordMatches = await Bcrypt.compare(createAuthDto.password, foundUser.password);
    if (!passwordMatches) {
      throw new NotFoundException('Invalid credentials');
    }

    const { accessToken, refreshToken } = await this.getTokens(
      foundUser.id,
      foundUser.email,
      foundUser.role,
    );

    await this.saveRefreshToken(foundUser.id, refreshToken);

    return { accessToken, refreshToken };
  }

  // Sign out user
  async signOut(id: number) {
    const res = await this.profileRepository.update(id, { hashedRefreshToken: null });

    if (res.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return { message: `User with ID ${id} signed out successfully` };
  }

  // Refresh access and refresh tokens
  async refreshTokens(id: number, refreshToken: string) {
    const foundUser = await this.profileRepository.findOne({ where: { id } });

    if (!foundUser || !foundUser.hashedRefreshToken) {
      throw new NotFoundException('Invalid or expired refresh token');
    }

    const refreshTokenMatches = await Bcrypt.compare(refreshToken, foundUser.hashedRefreshToken);
    if (!refreshTokenMatches) {
      throw new NotFoundException('Invalid refresh token');
    }

    const { accessToken, refreshToken: newRefreshToken } = await this.getTokens(
      foundUser.id,
      foundUser.email,
      foundUser.role,
    );

    await this.saveRefreshToken(foundUser.id, newRefreshToken);

    return { accessToken, refreshToken: newRefreshToken };
  }
}
