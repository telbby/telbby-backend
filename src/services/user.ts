import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

import UserEntity from '../entity/user';
import UserRepository from '../repositories/user';
import ErrorResponse from '../utils/error-response';
import { commonError } from '../constants/error';

@Service()
class UserService {
  private userRepository: UserRepository;

  constructor(@InjectRepository(UserRepository) userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getUser(idx: number): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findByIdx(idx);
      if (!user) {
        throw new ErrorResponse(commonError.unauthorized);
      }
      return user;
    } catch (e) {
      throw new ErrorResponse(commonError.wrong);
    }
  }
}

export default UserService;
