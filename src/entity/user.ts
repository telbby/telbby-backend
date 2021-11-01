import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'user' })
class UserEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ length: 45 })
  id: string;

  @Column('text')
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

export default UserEntity;
