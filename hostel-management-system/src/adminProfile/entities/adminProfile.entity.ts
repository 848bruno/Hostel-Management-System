import { Entity, Column, PrimaryGeneratedColumn ,OneToOne,JoinColumn} from 'typeorm';
import { Admin } from 'src/admin/entities/admin.entity';

@Entity()
export class AdminProfile {
  @PrimaryGeneratedColumn()
  Admin_id: number;
  @Column()
  first_name: string;
  @Column()
  last_name: string;
  @Column()
  phone_number: string;
  @Column()
  address: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @OneToOne(() => Admin, admin => admin.profile)
  @JoinColumn({ name: 'Admin_id' })
  admin: Admin;
}
