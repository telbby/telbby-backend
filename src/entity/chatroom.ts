import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import ProjectEntity from './project';
import UserEntity from './user';

@Entity({ name: 'chatroom' })
class ChatroomEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => ProjectEntity, project => project.id, { nullable: false })
  project: ProjectEntity;

  @ManyToOne(() => UserEntity, user => user.uid, { nullable: false })
  admin: UserEntity;

  @ManyToOne(() => UserEntity, user => user.uid, { nullable: false })
  reviewer: UserEntity;
}

export default ChatroomEntity;
