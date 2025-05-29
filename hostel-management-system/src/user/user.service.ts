import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Complain } from 'src/complains/entities/complain.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Complain) private complainRepository: Repository<Complain>,
  ) {}
 async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository
      .save(user)
      .then((savedUser) => {
        return savedUser;
      })
      .catch((error) => {
        throw new Error(`Error creating user: ${error.message}`);
      });
  }

  findAll(email?: string) {
    if (email) {
      return this.userRepository.find({
        where: { email: email },   
        relations: ['complain'],
      });
    } 
    return this.userRepository.find({
      relations: ['complain'],
    });
  }

  async findOne(userid: number): Promise<User | string> {
    try {
      const user = await this.userRepository.findOne({ where: { userid }, relations: ['complain'] });
      if (!user) {
        return `No user found with id ${userid}`;
      }
      return user;
    } catch (error) {
      throw new Error(`Failed to find user with id ${userid}`);
    }
  }

 async  update(userid: number, updateUserDto: UpdateUserDto): Promise<User | string> {
    const user = await this.userRepository.findOne({ where: { userid } });
    if (!user) {
      return `User with id ${userid} not found`;
    }
    await this.userRepository.update(userid, updateUserDto);
    return `This action updates a #${userid} user`;
  }

  async remove(userid: number): Promise<string> {
    const result = await this.userRepository.delete(userid);
    if (result.affected === 0) {
      return `No user found with id ${userid}`;
    }
    return `This action removes a #${userid} user`;

  }
}
