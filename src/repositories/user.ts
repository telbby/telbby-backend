import { EntityRepository, Repository } from 'typeorm';

import UserEntity from '../entity/user';
import { UserInfo } from '../types';

@EntityRepository(UserEntity)
class UserRepository extends Repository<UserEntity> {
  async findByUid(uid: string): Promise<UserEntity | undefined> {
    const user = await this.findOne({ where: { uid } });
    return user;
  }

  async findByUserId(userId: string): Promise<UserEntity | undefined> {
    const user = await this.findOne({ where: { userId } });
    return user;
  }

  async createUser(userInfo: UserInfo): Promise<UserEntity> {
    const newUser = this.create(userInfo);
    const createdUser = await this.save(newUser);
    return createdUser;
  }
}

export default UserRepository;
