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

  async addItem(id: string, password: string): Promise<UserEntity> {
    const newUser = new UserEntity();
    newUser.id = id;
    newUser.password = password;

    const createdUser = await this.save(newUser);

    return createdUser;
  }
}

export default UserRepository;
