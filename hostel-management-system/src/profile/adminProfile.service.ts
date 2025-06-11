import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async create(createProfileDto: CreateProfileDto) {
    try {
      // Normalize email and hash password
      const normalizedEmail = createProfileDto.email.toLowerCase();
      const hashedPassword = await bcrypt.hash(createProfileDto.password, 10);

      const profile = this.profileRepository.create({
        ...createProfileDto,
        email: normalizedEmail,
        password: hashedPassword,
      });

      return await this.profileRepository.save(profile);
    } catch (error) {
      throw new Error(`Error creating profile: ${error.message}`);
    }
  }

  findAll(id?: number) {
    if (id) {
      return this.profileRepository.find({
        where: { id },
        relations: ['admin', 'student'],
      });
    }
    return this.profileRepository.find({ relations: ['admin', 'student'] });
  }

  async findOne(id: number): Promise<Profile | string> {
    try {
      const profile = await this.profileRepository.findOne({
        where: { id },
        relations: ['admin', 'student'],
      });

      if (!profile) {
        return `No profile found with id ${id}`;
      }

      return profile;
    } catch (error) {
      throw new Error(`Failed to find profile with id ${id}`);
    }
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    if (updateProfileDto.password) {
      updateProfileDto.password = await bcrypt.hash(
        updateProfileDto.password,
        10,
      );
    }

    await this.profileRepository.update(id, updateProfileDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<string> {
    try {
      const result = await this.profileRepository.delete(id);
      if (result.affected === 0) {
        return `No profile found with id ${id}`;
      }
      return `Profile with id ${id} has been removed`;
    } catch (error) {
      throw new Error(`Failed to remove profile with id ${id}`);
    }
  }
}
