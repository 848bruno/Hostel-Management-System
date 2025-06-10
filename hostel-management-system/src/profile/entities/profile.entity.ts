import { Entity, Column, PrimaryGeneratedColumn, OneToOne, Relation } from 'typeorm';
import { Student } from 'src/student/entities/student.entity';
import { Admin } from 'src/admin/entities/admin.entity';

export enum Role {
  ADMIN = 'admin',
  STUDENT = 'student',
  GUEST = 'guest',
}

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.GUEST })
  role: Role;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToOne(() => Admin, admin => admin.profile)
  admin: Admin;
  @Column({ type: 'text', nullable: true, default: null })
  hashedRefreshToken: string | null;

  @OneToOne(() => Student, (student) => student.profile)
  student: Relation<Student>;
}
