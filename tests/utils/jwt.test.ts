import { Algorithm } from 'jsonwebtoken';

import { REFRESH_TOKEN_COOKIE_KEY } from '../../src/constants/auth';
import { getAccessToken, getJwtAlgorithm, getRefreshToken } from '../../src/utils/jwt';

describe('jwt utils 테스트', () => {
  describe('getJwtAlgorithm() 함수 테스트', () => {
    it('허용된 알고리즘의 경우, 그대로 반환해야 합니다.', () => {
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
      jwtAlgorithms.forEach(algorithm => {
        expect(getJwtAlgorithm(algorithm)).toBe(algorithm);
      });
    });

    it('허용되지 않은 알고리즘을 넘길 경우, none을 반환해야 합니다.', () => {
      expect(getJwtAlgorithm('UnallowedAlgorithm')).toBe('none');
      expect(getJwtAlgorithm('HAHAHAHA')).toBe('none');
      expect(getJwtAlgorithm('Happy')).toBe('none');
    });
  });

  describe('getAccessToken() 함수 테스트', () => {
    it('올바르게 주어진 문자열에 대하여 access token을 반환해야 합니다.', () => {
      expect(getAccessToken('Bearer access-token')).toBe('access-token');
    });

    it('잘못 주어진 문자열에 대하여 빈 문자열을 반환해야 합니다.', () => {
      expect(getAccessToken('access-token')).toBe('');
      expect(getAccessToken('')).toBe('');
      expect(getAccessToken('Beareraccess-token')).toBe('');
      expect(getAccessToken('Bear access-token')).toBe('');
    });
  });

  describe('getRefreshToken() 함수 테스트', () => {
    it('올바르게 주어진 문자열에 대하여 refresh token을 반환해야 합니다.', () => {
      expect(getRefreshToken({ [REFRESH_TOKEN_COOKIE_KEY]: 'refresh-token' })).toBe(
        'refresh-token',
      );
    });

    it('잘못 주어진 문자열에 대하여 빈 문자열을 반환해야 합니다.', () => {
      expect(getRefreshToken({ [REFRESH_TOKEN_COOKIE_KEY]: '' })).toBe('');
    });
  });
});
