import { Injectable } from '@nestjs/common';
import { CreateComplainDto } from './dto/create-complain.dto';
import { UpdateComplainDto } from './dto/update-complain.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Complain } from './entities/complain.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ComplainsService {
  constructor(@InjectRepository(Complain) private complainsRepository: Repository<Complain>) {
    
  }
  async create(createComplainDto: CreateComplainDto) {
    return await this.complainsRepository
      .save(createComplainDto)
      .then((complain) => {
        return complain;
      })
      .catch((error) => {
        throw new Error(`Error creating complain: ${error.message}`);
      });
  }

  async findAll(search?: string) {
  if (search) {
    return await this.complainsRepository.find(
      {where: { complain: `%${search}%` } }
    );
  }
    return this.complainsRepository.find({
      relations:['user'],
    });
  }

  async findOne(complainid: number) {
      return this.complainsRepository.findOne({
        where: { complainid: complainid },
        relations: ['user'],})
        .then((complain) => {
          if (!complain) {
            return `No complain found with id ${complainid}`;
          }
          return complain;
        }) 
        .catch((error) => {
          console.error('Error finding complain:', error);
          throw new Error(`Failed to find complain with id ${complainid}`);
        });
    
    
  }

  async update(complainid: number, updateComplainDto: UpdateComplainDto) {
   const complain = await this.complainsRepository.findOne({ 
    where:{ complainid},
    relations:['user'],
    });
    if (!complain) {
      return `No complain found with id ${complainid}`;
    }
    if (updateComplainDto.user) {
      const user = await this.complainsRepository.manager.findOne(User, {
        where: { userid: updateComplainDto.user.userid },
      });
      if (!user) {
        return `User with id ${updateComplainDto.user.userid} not found`;
      }
      updateComplainDto.user = user;
    }
    if (updateComplainDto.status)  complain.status = updateComplainDto.status;
    if (updateComplainDto.complain) complain.complain = updateComplainDto.complain;
     
    await this.complainsRepository.save(complain);
    // Update the complain with the new data    
  }


  async remove(complainid: number) {
    const result = await this.complainsRepository.delete(complainid);
    if (result.affected === 0) {
      return `No complain found with id ${complainid}`;
    }
   
  }
}
