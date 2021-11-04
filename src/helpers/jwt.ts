import jwt, { Algorithm, JwtPayload, SignOptions } from 'jsonwebtoken';

import { ACCESS_TOKEN_SUBJECT, REFRESH_TOKEN_SUBJECT } from '../constants/auth';

export type JwtOptions = {
  algorithm: Algorithm;
  secret: string;
  accessExpiresInHour: number;
  refreshExpiresInHour: number;
};

export interface OwnAccessJwtPayload {
  uid: string;
  userId: string;
}

export interface OwnRefreshJwtPayload {
  uid: string;
}

export interface OwnJwtPayload extends OwnAccessJwtPayload, OwnRefreshJwtPayload {}
export interface AccessJwtPayload extends JwtPayload, OwnAccessJwtPayload {}
export interface RefreshJwtPayload extends JwtPayload, OwnRefreshJwtPayload {}

class JwtHelper {
  private algorithm: Algorithm;

  private secret: string;

  private accessExpiresInSeconds: number;

  private refreshExpiresInSeconds: number;

  constructor({ algorithm, secret, accessExpiresInHour, refreshExpiresInHour }: JwtOptions) {
    this.algorithm = algorithm;
    this.secret = secret;
    this.accessExpiresInSeconds = accessExpiresInHour * 3600;
    this.refreshExpiresInSeconds = refreshExpiresInHour * 3600;
  }

  generateAccessToken({ uid, userId }: OwnAccessJwtPayload): string {
    const jwtOptions: SignOptions = {
      algorithm: this.algorithm,
      expiresIn: this.accessExpiresInSeconds,
      subject: ACCESS_TOKEN_SUBJECT,
    };

    return jwt.sign({ uid, userId }, this.secret, jwtOptions);
  }

  generateRefreshToken({ uid }: OwnRefreshJwtPayload): string {
    const jwtOptions: SignOptions = {
      algorithm: this.algorithm,
      expiresIn: this.refreshExpiresInSeconds,
      subject: REFRESH_TOKEN_SUBJECT,
    };

    return jwt.sign({ uid }, this.secret, jwtOptions);
  }

  generateJwtTokens(payload: OwnJwtPayload): { access: string; refresh: string } {
    const access = this.generateAccessToken(payload);
    const refresh = this.generateRefreshToken(payload);

    return { access, refresh };
  }

  decodeJwtToken(token: string, subject?: string): string | JwtPayload {
    const decodedToken = jwt.verify(token, this.secret, {
      algorithms: [this.algorithm],
      subject,
    });
    return decodedToken;
  }

  decodeAccessToken(token: string): AccessJwtPayload {
    return this.decodeJwtToken(token, ACCESS_TOKEN_SUBJECT) as AccessJwtPayload;
  }

  decodeRefreshToken(token: string): RefreshJwtPayload {
    return this.decodeJwtToken(token, REFRESH_TOKEN_SUBJECT) as RefreshJwtPayload;
  }

  getRefreshExpiresInMs(): number {
    const expireMs = 1000 * this.refreshExpiresInSeconds;
    return expireMs;
  }
}

export default JwtHelper;
