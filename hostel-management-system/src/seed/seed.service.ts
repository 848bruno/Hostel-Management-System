import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Student } from 'src/student/entities/student.entity';
import { User } from 'src/user/entities/user.entity';
import { Admin } from 'src/admin/entities/admin.entity';
import { AdminProfile } from 'src/adminProfile/entities/adminProfile.entity';
import { Complain } from 'src/complains/entities/complain.entity';
import { Feedback } from 'src/feedback/entities/feedback.entity';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    @InjectRepository(AdminProfile)
    private adminProfileRepository: Repository<AdminProfile>,
    @InjectRepository(Complain)
    private complainRepository: Repository<Complain>,
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
  ) {}

  async run() {
    this.logger.log('Seeding database...');

    // Seed Users
    const users: User[] = [];
    for (let i = 0; i < 10; i++) {
      const user = this.userRepository.create({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        last_login: faker.date.recent(),
      });
      users.push(await this.userRepository.save(user));
    }
    this.logger.log(`Created ${users.length} users`);

    // Seed Admins and Profiles
    const admins: Admin[] = [];
    for (let i = 0; i < 5; i++) {
      const admin = new Admin();
      admin.username = faker.internet.userName();
      admin.last_login = faker.date.recent();

      const profile = new AdminProfile();
      profile.first_name = faker.person.firstName();
      profile.last_name = faker.person.lastName();
      profile.phone_number = faker.phone.number();
      profile.address = faker.location.streetAddress();
        profile.email = faker.internet.email();
      profile.password = faker.internet.password({ length: 10 });
       profile.hashedRefreshToken = null
      admin.profile = profile;

      admins.push(await this.adminRepository.save(admin));
    }
    this.logger.log(`Created ${admins.length} admins with profiles`);

    // Seed Students
    const students: Student[] = [];
    for (let i = 0; i < 20; i++) {
      const student = this.studentRepository.create({
        room_id: faker.number.int({ min: 1, max: 10 }),
        course_id: faker.number.int({ min: 1, max: 5 }),
        registration_date: faker.date.past(),
      });
      students.push(await this.studentRepository.save(student));
    }
    this.logger.log(`Created ${students.length} students`);

    // Seed Complaints
    const complaints: Complain[] = [];
    for (let i = 0; i < 30; i++) {
      const complaint = new Complain();
      complaint.complain = faker.lorem.sentence();
      complaint.status = faker.helpers.arrayElement(['OPEN', 'IN_PROGRESS', 'RESOLVED']);
      complaint.userid = faker.helpers.arrayElement(users).userid;
      complaint.student = faker.helpers.arrayElement(students);
      complaint.user = faker.helpers.arrayElement(users);

      complaints.push(await this.complainRepository.save(complaint));
    }
    this.logger.log(`Created ${complaints.length} complaints`);

    // Seed Feedbacks
    const feedbacks: Feedback[] = [];
    for (let i = 0; i < 20; i++) {
      const feedback = new Feedback();
      feedback.feedback_text = faker.lorem.sentences(2);
      feedback.rating = faker.number.int({ min: 1, max: 5 });
      feedback.student = faker.helpers.arrayElement(students);

      // Assign 1 to 3 complaints to this feedback
      const selectedComplaints = faker.helpers.arrayElements(complaints, faker.number.int({ min: 1, max: 3 }));
      feedback.complain = selectedComplaints;

      feedbacks.push(await this.feedbackRepository.save(feedback));
    }
    this.logger.log(`Created ${feedbacks.length} feedbacks`);

    this.logger.log('Database seeding completed ');
  }
}
