import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Profile } from 'src/profile/entities/profile.entity';

@Entity()
export class Admin {

  @PrimaryGeneratedColumn()
  id: number;

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
  @JoinColumn()
  @OneToOne(() => Profile, (profile) => profile.admin, { cascade: true })
  profile: Profile;
}
