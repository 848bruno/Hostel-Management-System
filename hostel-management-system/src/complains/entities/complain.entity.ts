import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Student } from 'src/student/entities/student.entity'
import { Feedback } from 'src/feedback/entities/feedback.entity';

@Entity()
export class Complain {
  @PrimaryGeneratedColumn()
  complainid: number;
  @Column()
  complain: string;
  @Column()
  status: string;
  @Column()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @ManyToOne(() => Student, student => student.complain)
  student: Student;

  @ManyToMany(() => Feedback, feedback => feedback.complain)
  @JoinTable()
  feedbacks: Feedback[];
  @ManyToOne(() => User, user => user.complain, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
