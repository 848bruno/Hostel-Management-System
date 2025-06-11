import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  ManyToMany,
} from 'typeorm';
import { Student } from 'src/student/entities/student.entity';
import { Complain } from 'src/complains/entities/complain.entity';

@Entity('feedbacks')
export class Feedback {
  @PrimaryGeneratedColumn()
  feedback_id: number;

  @Column('text')
  feedback_text: string;

  @Column('int')
  rating: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Student, (student) => student.feedbacks)
  student: Student;

  @ManyToMany(() => Complain, (complain) => complain.feedbacks)
  complain: Complain;
}
