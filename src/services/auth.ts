import { Inject, Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { commonError } from '../constants/error';
import { comparePassword } from '../utils/hash';
import JwtHelper from '../helpers/jwt';
import UserRepository from '../repositories/user';
import ErrorResponse from '../utils/error-response';

@Service()
class AuthService {
  private userRepository: UserRepository;

  private jwtHelper: JwtHelper;

  constructor(
    @InjectRepository(UserRepository) userRepository: UserRepository,
    @Inject('jwtHelper') jwtHelper: JwtHelper,
  ) {
    this.userRepository = userRepository;
    this.jwtHelper = jwtHelper;
  }

  async login(id: string, password: string): Promise<{ access: string; refresh: string }> {
    try {
      const user = await this.userRepository.findById(id);
      if (!user) {
        throw new ErrorResponse(commonError.unauthorized);
      }

      const isValid = comparePassword(user.password, password);
      if (!isValid) {
        throw new ErrorResponse(commonError.unauthorized);
      }

      const tokens = this.jwtHelper.generateJwtTokens(user);
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

      const { idx } = this.jwtHelper.decodeRefreshToken(refreshToken);

      const user = await this.userRepository.findByIdx(idx);
      if (!user) {
        throw new ErrorResponse(commonError.unauthorized);
      }

      const access = this.jwtHelper.generateAccessToken(user);
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
