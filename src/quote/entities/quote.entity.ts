import { User } from "src/user/entities/user.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

User// Import your User entity

@Entity()
export class Quote {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  author: string;
  @Column()
  quote: string;

  @ManyToOne(() => User, user => user.quotes)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: number;// Foreign key to the users table
}