import { Algorithm } from 'jsonwebtoken';

import { getJwtAlgorithm } from '../../src/utils/jwt';

describe('hash utils 테스트', () => {
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
});
