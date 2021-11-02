import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { commonError } from '../constants/error';
import * as hashHelper from '../helpers/hash';
import * as jwtHelper from '../helpers/jwt';
import UserRepository from '../repositories/user';
import ErrorResponse from '../utils/error-response';

@Service()
class AuthService {
  private userRepository: UserRepository;

  constructor(@InjectRepository(UserRepository) userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async login(id: string, password: string): Promise<{ access: string; refresh: string }> {
    try {
      const user = await this.userRepository.findById(id);
      if (!user) {
        throw new ErrorResponse(commonError.unauthorized);
      }

      const isValid = hashHelper.comparePassword(user.password, password);
      if (!isValid) {
        throw new ErrorResponse(commonError.unauthorized);
      }

      const tokens = jwtHelper.generateJwtTokens(user);
      return tokens;
    } catch (e) {
      if ((e as ErrorResponse)?.isOperational) {
        throw e;
      }
      console.error(e);
      throw new ErrorResponse(commonError.wrong);
    }
  }

  async refreshAccessToken(refreshToken: string): Promise<{ access: string }> {
    try {
      if (!refreshToken) {
        throw new ErrorResponse(commonError.unauthorized);
      }

      const { idx } = jwtHelper.decodeRefreshToken(refreshToken);

      const user = await this.userRepository.findByIdx(idx);
      if (!user) {
        throw new ErrorResponse(commonError.unauthorized);
      }

      const access = jwtHelper.generateAccessToken(user);
      return { access };
    } catch (e) {
      if ((e as ErrorResponse)?.isOperational) {
        throw e;
      }
      console.error(e);
      throw new ErrorResponse(commonError.wrong);
    }
  }
}

export default AuthService;
