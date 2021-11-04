import { Algorithm } from 'jsonwebtoken';

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
