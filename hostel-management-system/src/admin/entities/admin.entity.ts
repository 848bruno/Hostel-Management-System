import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { AdminProfile } from 'src\adminProfile\entities\adminProfile.entity.ts';
@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  admin_id: number;

  @Column()
  username: string;
  @Column('date')
  last_login: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
    @OneToOne(() => AdminProfile, profile => AdminProfile.Admin_id, { cascade: true })
  profile: AdminProfile;
}
