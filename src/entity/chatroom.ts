import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import ServiceEntity from './service';
import UserEntity from './user';

@Entity({ name: 'chatroom' })
class ChatroomEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => ServiceEntity, service => service.id, { nullable: false })
  service: ServiceEntity;

  @ManyToOne(() => UserEntity, user => user.uid, { nullable: false })
  admin: UserEntity;

  @ManyToOne(() => UserEntity, user => user.uid, { nullable: false })
  reviewer: UserEntity;
}

export default ChatroomEntity;
