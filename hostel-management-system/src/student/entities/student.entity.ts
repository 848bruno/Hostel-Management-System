import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
  Relation,
} from 'typeorm';
import { Complain } from 'src/complains/entities/complain.entity';

import { Feedback } from 'src/feedback/entities/feedback.entity';
import { Profile } from 'src/profile/entities/profile.entity';
@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  room_id: number;

  @Column()
  course_id: number;

  @Column({ type: 'timestamp' })
  registration_date: Date;

  @OneToOne(() => Profile, (profile) => profile.student, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  profile: Relation<Profile>;

  @OneToMany(() => Complain, (complain) => complain.student)
  complain: Complain[];

  @OneToMany(() => Feedback, (feedback) => feedback.student)
  feedbacks: Feedback[];
}
