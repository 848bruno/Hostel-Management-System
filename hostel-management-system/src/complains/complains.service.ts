import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateComplainDto } from './dto/create-complain.dto';
import { UpdateComplainDto } from './dto/update-complain.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Complain } from './entities/complain.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Student } from 'src/student/entities/student.entity';


@Injectable()
export class ComplainsService {
  constructor(@InjectRepository(Complain) private complainRepository: Repository<Complain>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,

  ) {

  }
  async create(createComplainDto: CreateComplainDto): Promise<Complain> {
    const student = await this.studentRepository.findOne({ where: { id: createComplainDto.userid } });
    if (!student) {
      throw new NotFoundException(`Student with ID ${createComplainDto.userid} not found`);
    }
    const complaint = this.complainRepository.create({
      complain: createComplainDto.complain,
      status: createComplainDto.status,
      student,
    });
    return this.complainRepository.save(complaint);
  }

  findAll(): Promise<Complain[]> {
    return this.complainRepository.find({ relations: ['feedbacks', 'user'] });
  }

  async findOne(id: number): Promise<Complain> {
    const complaint = await this.complainRepository.findOne({ where: { complainid: id }, relations: ['feedbacks', 'user'] });
    if (!complaint) {
      throw new NotFoundException(`Complain with ID ${id} not found`);
    }
    return complaint;
  }

  async update(id: number, updateComplainDto: UpdateComplainDto): Promise<Complain> {
    const complain = await this.findOne(id);
    Object.assign(complain, updateComplainDto);
    return this.complainRepository.save(complain);
  }

  async remove(id: number): Promise<void> {
    await this.complainRepository.delete(id);
  }
}
