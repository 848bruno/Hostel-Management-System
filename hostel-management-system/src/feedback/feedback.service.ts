import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './entities/feedback.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { Student } from 'src/student/entities/student.entity';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async create(createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
    const student = await this.studentRepository.findOne({
      where: { id: createFeedbackDto.userid },
    });
    if (!student) {
      throw new NotFoundException(
        `user with ID ${createFeedbackDto.userid} not found`,
      );
    }
    const feedback = this.feedbackRepository.create({
      feedback_text: createFeedbackDto.feedback_text,
      rating: createFeedbackDto.rating,
      student,
    });
    return this.feedbackRepository.save(feedback);
  }

  findAll(): Promise<Feedback[]> {
    return this.feedbackRepository.find({ relations: ['user', 'complain'] });
  }

  async findOne(id: number): Promise<Feedback> {
    const feedback = await this.feedbackRepository.findOne({
      where: { feedback_id: id },
      relations: ['user', 'complain'],
    });
    if (!feedback) {
      throw new NotFoundException(`Feedback with ID ${id} not found`);
    }
    return feedback;
  }

  async update(
    id: number,
    updateFeedbackDto: UpdateFeedbackDto,
  ): Promise<Feedback> {
    const feedback = await this.findOne(id);
    Object.assign(feedback, updateFeedbackDto);
    return this.feedbackRepository.save(feedback);
  }

  async remove(id: number): Promise<void> {
    await this.feedbackRepository.delete(id);
  }
}
