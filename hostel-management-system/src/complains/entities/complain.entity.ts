import{ Entity,Column,PrimaryGeneratedColumn ,ManyToOne,JoinColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
@Entity()
export class Complain {
    @PrimaryGeneratedColumn()
    complainid:number;
    @Column()
    complain:string;
    @Column()
    status:string;
    @Column()
    userid:number;

     @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @ManyToOne(() => User, user => user.complain, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' }) 
  user: User;
}
