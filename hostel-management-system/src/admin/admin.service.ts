import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
  ) {}
  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    return await this.adminRepository
      .save(createAdminDto)
      .then((admin) => {
        return admin;
      })
      .catch((error) => {
        throw new Error(`Error creating admin: ${error.message}`);
      });
  }

  async findAll(Admin_id?: number) {
    if (Admin_id) {
      return await this.adminRepository.find({ where: { Admin_id: Admin_id } });
    }
    return await this.adminRepository.find();
  }

  async findOne(Admin_id: number): Promise<Admin | string> {
    return await this.adminRepository
      .findOneBy({ Admin_id: Admin_id })
      .then((Admin) => {
        if (!Admin) {
          return `No Admin found with id ${Admin_id}`;
        }
        return Admin;
      })
      .catch((error) => {
        console.error('Error finding Admin:', error);
        throw new Error(`Failed to find Admin with id ${Admin_id}`);
      });
  }
  async update(
    Admin_id: number,
    updateAdminDto: UpdateAdminDto,
  ): Promise<Admin | string> {
    await this.adminRepository.update(Admin_id, updateAdminDto);
    return this.findOne(Admin_id);
  }

  async remove(id: number): Promise<string> {
    return await this.adminRepository
      .delete(id)
      .then((result) => {
        if (result.affected === 0) {
          return `No admin found with id ${id}`;
        }
        return `Admin with id ${id} has been removed`;
      })
      .catch((error) => {
        console.error('Error removing admin:', error);
        throw new Error(`Failed to remove admin with id ${id}`);
      });
  }
}
