import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

import { Student } from 'src/student/entities/student.entity';
import { User } from 'src/user/entities/user.entity';
import { Admin } from 'src/admin/entities/admin.entity';
import { Profile } from 'src/profile/entities/profile.entity';
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
        @InjectRepository(Profile)
        private profileRepository: Repository<Profile>,
        @InjectRepository(Complain)
        private complainRepository: Repository<Complain>,
        @InjectRepository(Feedback)
        private feedbackRepository: Repository<Feedback>,
    ) { }

    async seed() {
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
            const rawPassword = faker.internet.password({ length: 10 });
            const hashedPassword = await bcrypt.hash(rawPassword, 10);

            const profile = new Profile();
            profile.username = faker.internet.userName();
            profile.email = faker.internet.email();
            profile.password = hashedPassword;
            profile.hashedRefreshToken = null;

            const admin = new Admin();
            admin.username = faker.internet.userName();
            admin.last_login = faker.date.recent();
            admin.profile = profile;

            const savedAdmin = await this.adminRepository.save(admin);
            this.logger.log(`Admin created: ${profile.email} / ${rawPassword}`);

            admins.push(savedAdmin);
        }

        // Optional: Seed one known test user for login
        const knownPassword = 'pass1234';
        const knownHashed = await bcrypt.hash(knownPassword, 10);
        const knownProfile = this.profileRepository.create({
            email: 'test@example.com',
            username: 'testuser',
            password: knownHashed,
            hashedRefreshToken: null,
        });
        await this.profileRepository.save(knownProfile);
        this.logger.log(`Test login -> email: test@example.com | password: ${knownPassword}`);

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
            complaint.student = faker.helpers.arrayElement(students);
            complaint.user = faker.helpers.arrayElement(users);
            complaint.id = complaint.user.userid;

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

            const selectedComplaints = faker.helpers.arrayElements(
                complaints,
                faker.number.int({ min: 1, max: 3 }),
            );
            feedback.complain = selectedComplaints;

            feedbacks.push(await this.feedbackRepository.save(feedback));
        }
        this.logger.log(`Created ${feedbacks.length} feedbacks`);

        this.logger.log('Database seeding completed successfully');
    }
}
