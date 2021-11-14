import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import ThemeEntity from './theme';
import UserEntity from './user';

@Entity({ name: 'service' })
class ServiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 45 })
  name: string;

  @Column('char', { length: 20, unique: true })
  clientId: string;

  @Column('varchar', { length: 100, nullable: true })
  description: string;

  @Column('varchar', { length: 45, nullable: true })
  domain: string;

  @Column('varchar', { length: 100, nullable: true })
  image: string;

  @Column('varchar', { length: 45, nullable: true })
  question: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => ThemeEntity, theme => theme.id, { nullable: false })
  theme: ThemeEntity;

  @ManyToOne(() => UserEntity, user => user.uid, { nullable: false })
  user: UserEntity;
}

export default ServiceEntity;
