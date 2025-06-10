import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private ProfileRepository: Repository<Profile>,
  ) { }
  async create(createProfileDto: CreateProfileDto) {
    return await this.ProfileRepository
      .save(createProfileDto)
      .then((Profile) => {
        return Profile;
      })
      .catch((error) => {
        throw new Error(`Error creating Profile: ${error.message}`);
      });
  }

  findAll(id?: number) {
    if (id) {
      return this.ProfileRepository.find({
        where: { id: id }, relations: ['admin']
      });
    }
    return this.ProfileRepository.find({ relations: ['admin'] });
  }

  async findOne(id: number): Promise<Profile | string> {
    return await this.ProfileRepository
      .findOneBy({ id: id })
      .then((Profile) => {
        if (!Profile) {
          return `No Profile found with id ${id}`;
        }
        return Profile;
      })
      .catch((error) => {
        console.error('Error finding Profile:', error);
        throw new Error(`Failed to find Profile with id ${id}`);
      });
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    await this.ProfileRepository.update(id, updateProfileDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<string> {
    return await this.ProfileRepository
      .delete(id)
      .then((result) => {
        if (result.affected === 0) {
          return `No Profile found with id ${id}`;
        }
        return `Profile with id ${id} has been removed`;
      })
      .catch((error) => {
        console.error('Error removing Profile:', error);
        throw new Error(`Failed to remove Profile with id ${id}`);
      });
  }
}
