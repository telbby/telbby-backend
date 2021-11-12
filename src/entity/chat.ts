import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import ChatroomEntity from './chatroom';
import UserEntity from './user';

@Entity({ name: 'chat' })
class ChatEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 500 })
  message: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => UserEntity, user => user.uid, { nullable: false })
  user: UserEntity;

  @ManyToOne(() => ChatroomEntity, chatroom => chatroom.id, { nullable: false })
  chatroom: ChatEntity;
}

export default ChatEntity;
