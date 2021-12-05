import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import ProjectEntity from './project';
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

  @ManyToOne(() => ProjectEntity, project => project.id, { nullable: false })
  project: ProjectEntity;

  @ManyToOne(() => UserEntity, user => user.uid, { nullable: false })
  reviewer: UserEntity;
}

export default ReviewEntity;
