import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

import UserRepository from '../repositories/user';
import ErrorResponse from '../utils/error-response';
import { commonError } from '../constants/error';
import { generateHash } from '../utils/hash';

@Service()
class UserService {
  private userRepository: UserRepository;

  constructor(@InjectRepository(UserRepository) userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getUser(idx: number): Promise<{ id: string; createdAt: Date; updatedAt: Date }> {
    try {
      const user = await this.userRepository.findByIdx(idx);
      if (!user) {
        throw new ErrorResponse(commonError.unauthorized);
      }
      const { id, createdAt, updatedAt } = user;
      return { id, createdAt, updatedAt };
    } catch (e) {
      if ((e as ErrorResponse)?.isOperational) {
        throw e;
      }
      throw new ErrorResponse(commonError.wrong);
    }
  }

  async createUser(
    id: string,
    password: string,
  ): Promise<{ idx: number; createdAt: Date; updatedAt: Date }> {
    try {
      const alreadyRegisteredUser = await this.userRepository.findById(id);
      if (alreadyRegisteredUser) {
        throw new ErrorResponse(commonError.conflict);
      }

      const hashedPassword = generateHash(password);
      const createdUser = await this.userRepository.addItem(id, hashedPassword);
      const { idx, createdAt, updatedAt } = createdUser;
      return { idx, createdAt, updatedAt };
    } catch (e) {
      if ((e as ErrorResponse)?.isOperational) {
        throw e;
      }
      console.error(e);
      throw new ErrorResponse(commonError.wrong);
    }
  }
}

export default UserService;
