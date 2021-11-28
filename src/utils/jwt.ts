import jwt, { Algorithm, VerifyErrors } from 'jsonwebtoken';

import config from '../config';
import { REFRESH_TOKEN_COOKIE_KEY } from '../constants/auth';
import { commonError } from '../constants/error';
import { RefreshCookie } from '../types';
import ErrorResponse from './error-response';

export const getJwtAlgorithm = (algorithm: string): Algorithm => {
  const jwtAlgorithms: Algorithm[] = [
    'HS256',
    'HS384',
    'HS512',
    'RS256',
    'RS384',
    'RS512',
    'ES256',
    'ES384',
    'ES512',
    'PS256',
    'PS384',
    'PS512',
    'none',
  ];
  const jwtAlgorithm = jwtAlgorithms.find(jwtAlgo => jwtAlgo === algorithm) || 'none';
  return jwtAlgorithm;
};

export const getAccessToken = (authorization: string | undefined): string => {
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.split(' ')[1];
  }
  return '';
};

export const getRefreshToken = (cookies: RefreshCookie): string => {
  if (!cookies[REFRESH_TOKEN_COOKIE_KEY]) return '';
  return cookies[REFRESH_TOKEN_COOKIE_KEY];
};

export const getUIDFromToken = (token: string): string => {
  const decoded = jwt.decode(token);

  if (!decoded || typeof decoded === 'string') {
    throw new ErrorResponse(commonError.unauthorized);
  }

  const { uid } = decoded as { uid: string };
  return uid;
};

export const checkTokenExpiration = (token: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.jwt.secret, (err: VerifyErrors | null) => {
      if (err) {
        if (err.name === 'TokenExpiredError') resolve(true);
        else reject(err);
      }
      resolve(false);
    });
  });
};
