import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Complain } from 'src/complains/entities/complain.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userid: number;
  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  refreshToken: string;


  @Column()
  last_login: Date;
  @OneToMany(() => Complain, complain => complain.user)
  complain: Complain[];

}
