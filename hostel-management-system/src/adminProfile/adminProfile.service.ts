import { Injectable } from '@nestjs/common';
import { CreateAdminProfileDto } from './dto/create-admin-profile.dto';
import { UpdateAdminProfileDto } from './dto/update-admin-profile.dto';
import { AdminProfile } from './entities/adminProfile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AdminProfileService {
  constructor(
    @InjectRepository(AdminProfile)
    private adminProfileRepository: Repository<AdminProfile>,
  ) {}
  async create(createAdminProfileDto: CreateAdminProfileDto) {
    return await this.adminProfileRepository
      .save(createAdminProfileDto)
      .then((adminProfile) => {
        return adminProfile;
      })
      .catch((error) => {
        throw new Error(`Error creating adminProfile: ${error.message}`);
      });
  }

  findAll(Admin_id?: number) {
    if (Admin_id) {
      return this.adminProfileRepository.find({
        where: { Admin_id: Admin_id }, relations: ['admin']
      });
    }
    return this.adminProfileRepository.find({ relations: ['admin'] });
  }

  async findOne(Admin_id: number): Promise<AdminProfile | string> {
    return await this.adminProfileRepository
      .findOneBy({ Admin_id: Admin_id })
      .then((adminProfile) => {
        if (!adminProfile) {
          return `No AdminProfile found with id ${Admin_id}`;
        }
        return adminProfile;
      })
      .catch((error) => {
        console.error('Error finding AdminProfile:', error);
        throw new Error(`Failed to find AdminProfile with id ${Admin_id}`);
      });
  }

  async update(Admin_id: number, updateAdminProfileDto: UpdateAdminProfileDto) {
    await this.adminProfileRepository.update(Admin_id, updateAdminProfileDto);
    return this.findOne(Admin_id);
  }

  async remove(Admin_id: number): Promise<string> {
    return await this.adminProfileRepository
      .delete(Admin_id)
      .then((result) => {
        if (result.affected === 0) {
          return `No adminProfile found with id ${Admin_id}`;
        }
        return `AdminProfile with id ${Admin_id} has been removed`;
      })
      .catch((error) => {
        console.error('Error removing adminProfile:', error);
        throw new Error(`Failed to remove adminProfile with id ${Admin_id}`);
      });
  }
}
