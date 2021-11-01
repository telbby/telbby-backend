import { EntityRepository, Repository } from 'typeorm';

import UserEntity from '../entity/user';

@EntityRepository(UserEntity)
class UserRepository extends Repository<UserEntity> {
  async findByIdx(idx: number): Promise<UserEntity | undefined> {
    const user = await this.findOne({ where: { idx } });
    return user;
  }

  async findById(id: string): Promise<UserEntity | undefined> {
    const user = await this.findOne({ where: { id } });
    return user;
  }
}

export default UserRepository;
