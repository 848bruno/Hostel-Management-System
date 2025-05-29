import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Complain } from 'src/complains/entities/complain.entity';

// import {Feedback} from 'src/student/entities/student.entity';
// Import Feedback from its own file instead:
import { Feedback } from 'src/feedback/entities/feedback.entity';
@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  userid: number;

  @Column()
  room_id: number;

  @Column()
  course_id: number;

  @Column({type: 'timestamp'  })
  registration_date: Date;

  @OneToMany(() => Complain, complain => complain.student)
  complain: Complain[];

  @OneToMany(() => Feedback, feedback => feedback.student)
  feedbacks: Feedback[];
}