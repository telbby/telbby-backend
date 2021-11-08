import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'user' })
class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column('varchar', { length: 45, unique: true })
  userId: string;

  @Column('text')
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

export default UserEntity;
