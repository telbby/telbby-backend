import jwt, { Algorithm, JwtPayload, SignOptions } from 'jsonwebtoken';

import config from '../config';

const IS_ACCESS_TOKEN = true;
const IS_REFRESH_TOKEN = false;

export enum JwtToken {
  Access = 'ACCESS_TOKEN',
  Refresh = 'REFRESH_TOKEN',
}

export type OwnJwtPayload = {
  idx: number;
  id: string;
};

export interface AccessJwtPayload extends JwtPayload {
  idx: number;
  id: string;
}

export interface RefreshJwtPayload extends JwtPayload {
  idx: number;
}

export const convertStringToJwtAlgorithm = (algorithm: string): Algorithm => {
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

type AccessTokenGeneratorFunctionType = ({ idx, id }: AccessJwtPayload) => string;
type RefreshTokenGeneratorFunctionType = ({ idx }: RefreshJwtPayload) => string;

const createAccessOrRefreshTokenGenerator = (
  isAccessToken: boolean,
  expiresIn: number,
): AccessTokenGeneratorFunctionType | RefreshTokenGeneratorFunctionType => {
  const algorithm = convertStringToJwtAlgorithm(config.jwt.algorithm);
  const jwtOption: SignOptions = {
    algorithm,
    expiresIn,
    subject: isAccessToken ? JwtToken.Access : JwtToken.Refresh,
  };

  if (isAccessToken) {
    return ({ idx, id }: AccessJwtPayload) => jwt.sign({ idx, id }, config.jwt.secret, jwtOption);
  }

  return ({ idx }: RefreshJwtPayload) => jwt.sign({ idx }, config.jwt.secret, jwtOption);
};

export const generateAccessToken = createAccessOrRefreshTokenGenerator(
  IS_ACCESS_TOKEN,
  config.jwt.expire.access * 3600,
) as AccessTokenGeneratorFunctionType;

export const generateRefreshToken = createAccessOrRefreshTokenGenerator(
  IS_REFRESH_TOKEN,
  config.jwt.expire.refresh * 3600,
) as RefreshTokenGeneratorFunctionType;

export const generateJwtTokens = (payload: OwnJwtPayload): { access: string; refresh: string } => {
  const access = generateAccessToken(payload);
  const refresh = generateRefreshToken(payload);

  return { access, refresh };
};

const decodeToken = (subject: JwtToken, token: string) => {
  const algorithm = convertStringToJwtAlgorithm(config.jwt.algorithm);
  const decode = jwt.verify(token, config.jwt.secret, {
    algorithms: [algorithm],
    subject,
  });

  return decode;
};

export const decodeAccessToken = (token: string): AccessJwtPayload => {
  return decodeToken(JwtToken.Access, token) as AccessJwtPayload;
};

export const decodeRefreshToken = (token: string): RefreshJwtPayload => {
  return decodeToken(JwtToken.Refresh, token) as RefreshJwtPayload;
};

export const getRefreshExpiresInMs = (): number => {
  const expireMs = 1000 * 60 * 60 * config.jwt.expire.refresh;
  return expireMs;
};