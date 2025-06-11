import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

import { Student } from 'src/student/entities/student.entity';
import { Admin } from 'src/admin/entities/admin.entity';
import { Profile, Role } from 'src/profile/entities/profile.entity';
import { Complain } from 'src/complains/entities/complain.entity';
import { Feedback } from 'src/feedback/entities/feedback.entity';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,

    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,

    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,

    @InjectRepository(Complain)
    private complainRepository: Repository<Complain>,

    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
  ) {}

  async seed() {
    this.logger.log('Seeding database...');

    // Seed Admins with Profiles
    const admins: Admin[] = [];
    for (let i = 0; i < 5; i++) {
      const profile = new Profile();
      profile.username = faker.internet.userName();
      profile.email = faker.internet.email().toLowerCase();
      profile.password = await bcrypt.hash('admin123', 10);
      profile.role = Role.ADMIN;

      const admin = new Admin();
      admin.last_login = faker.date.recent();
      admin.profile = profile;

      admins.push(await this.adminRepository.save(admin));
    }
    this.logger.log(`Created ${admins.length} admins with profiles.`);

    // Seed Students with Profiles
    const students: Student[] = [];
    for (let i = 0; i < 20; i++) {
      const profile = new Profile();
      profile.username = faker.internet.userName();
      profile.email = faker.internet.email().toLowerCase();
      profile.password = await bcrypt.hash('student123', 10);
      profile.role = Role.STUDENT;

      const student = new Student();
      student.room_id = faker.number.int({ min: 1, max: 10 });
      student.course_id = faker.number.int({ min: 1, max: 5 });
      student.registration_date = faker.date.past();
      student.profile = profile;

      students.push(await this.studentRepository.save(student));
    }
    this.logger.log(`Created ${students.length} students with profiles.`);

    // Seed Complains
    const complaints: Complain[] = [];
    for (let i = 0; i < 30; i++) {
      const complaint = new Complain();
      complaint.complain = faker.lorem.sentence();
      complaint.status = faker.helpers.arrayElement([
        'OPEN',
        'IN_PROGRESS',
        'RESOLVED',
      ]);
      complaint.student = faker.helpers.arrayElement(students);
      complaints.push(await this.complainRepository.save(complaint));
    }
    this.logger.log(`Created ${complaints.length} complaints.`);

    // Seed Feedbacks
    const feedbacks: Feedback[] = [];
    for (let i = 0; i < 20; i++) {
      const feedback = new Feedback();
      feedback.feedback_text = faker.lorem.sentences(2);
      feedback.rating = faker.number.int({ min: 1, max: 5 });
      feedback.student = faker.helpers.arrayElement(students);
      feedback.complain = faker.helpers.arrayElement(complaints); // only one Complain
      feedbacks.push(await this.feedbackRepository.save(feedback));
    }
    this.logger.log(`Created ${feedbacks.length} feedbacks.`);

    this.logger.log('Database seeding completed.');
  }
}
