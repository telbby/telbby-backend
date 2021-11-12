import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import ServiceEntity from './service';
import UserEntity from './user';

@Entity({ name: 'review' })
class ReviewEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 20, nullable: true })
  title: string;

  @Column('varchar', { length: 200 })
  contents: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => ServiceEntity, service => service.id, { nullable: false })
  service: ServiceEntity;

  @ManyToOne(() => UserEntity, user => user.uid, { nullable: false })
  reviewer: UserEntity;
}

export default ReviewEntity;
