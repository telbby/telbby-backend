import jwt, { Algorithm, SignOptions } from 'jsonwebtoken';

import config from '../../src/config';
import * as jwtHelper from '../../src/helpers/jwt';

describe('jwtHelper 모듈 테스트', () => {
  describe('jwtHelper.convertStringToJwtAlgorithm() 함수 테스트', () => {
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
        expect(jwtHelper.convertStringToJwtAlgorithm(algorithm)).toBe(algorithm);
      });
    });

    it('허용되지 않은 알고리즘을 넘길 경우, none을 반환해야 합니다.', () => {
      expect(jwtHelper.convertStringToJwtAlgorithm('UnallowedAlgorithm')).toBe('none');
      expect(jwtHelper.convertStringToJwtAlgorithm('HAHAHAHA')).toBe('none');
      expect(jwtHelper.convertStringToJwtAlgorithm('Happy')).toBe('none');
    });
  });

  describe('jwtHelper.generateAccessToken() 함수 테스트', () => {
    const mockedAccessTokenPayload = { idx: 1, id: 'testID' };

    it('access token을 반환해야 합니다.', () => {
      const accessToken = jwtHelper.generateAccessToken(mockedAccessTokenPayload);

      expect(accessToken).not.toBeUndefined();
    });

    it('주어진 payload로 access token을 생성해야 합니다.', () => {
      const accessToken = jwtHelper.generateAccessToken(mockedAccessTokenPayload);

      const decodedAccessToken = jwt.verify(accessToken, config.jwt.secret, {
        algorithms: [config.jwt.algorithm as Algorithm],
        subject: 'ACCESS_TOKEN',
      }) as { idx: number; id: string };

      expect(decodedAccessToken.idx).toBe(mockedAccessTokenPayload.idx);
      expect(decodedAccessToken.id).toBe(mockedAccessTokenPayload.id);
    });

    it('생성된 access token의 subject는 "ACCESS_TOKEN"이어야 합니다.', () => {
      const accessToken = jwtHelper.generateAccessToken(mockedAccessTokenPayload);

      const decodedAccessToken = jwt.verify(accessToken, config.jwt.secret, {
        algorithms: [config.jwt.algorithm as Algorithm],
        subject: 'ACCESS_TOKEN',
      }) as { sub: string };

      expect(decodedAccessToken.sub).toBe('ACCESS_TOKEN');
    });
  });

  describe('jwtHelper.generateRefreshToken() 함수 테스트', () => {
    const mockedRefreshTokenPayload = { idx: 1 };

    it('refresh token을 반환해야 합니다.', () => {
      const refreshToken = jwtHelper.generateRefreshToken(mockedRefreshTokenPayload);

      expect(refreshToken).not.toBeUndefined();
    });

    it('주어진 payload로 refresh token을 생성해야 합니다.', () => {
      const refreshToken = jwtHelper.generateRefreshToken(mockedRefreshTokenPayload);

      const decodedRefreshToken = jwt.verify(refreshToken, config.jwt.secret, {
        algorithms: [config.jwt.algorithm as Algorithm],
        subject: 'REFRESH_TOKEN',
      }) as { idx: number };

      expect(decodedRefreshToken.idx).toBe(mockedRefreshTokenPayload.idx);
    });

    it('생성된 refresh token의 subject는 "REFRESH_TOKEN"이어야 합니다.', () => {
      const refreshToken = jwtHelper.generateRefreshToken(mockedRefreshTokenPayload);

      const decodedRefreshToken = jwt.verify(refreshToken, config.jwt.secret, {
        algorithms: [config.jwt.algorithm as Algorithm],
        subject: 'REFRESH_TOKEN',
      }) as { sub: string };

      expect(decodedRefreshToken.sub).toBe('REFRESH_TOKEN');
    });
  });

  describe('jwtHelper.generateJwtTokens() 함수 테스트', () => {
    const mockedJwtTokensPayload = { idx: 1, id: 'testID' };

    it('access token과 refresh token을 반환해야 합니다.', () => {
      const jwtTokens = jwtHelper.generateJwtTokens(mockedJwtTokensPayload);

      expect(jwtTokens.access).not.toBeUndefined();
      expect(jwtTokens.refresh).not.toBeUndefined();
    });
  });

  describe('jwtHelper.decodeAccessToken() 함수 테스트', () => {
    const mockedAccessTokenPayload = { idx: 1, id: 'testID' };
    const jwtOption: SignOptions = {
      algorithm: 'HS256',
      expiresIn: 3600,
      subject: 'ACCESS_TOKEN',
    };

    it('access token의 payload를 반환해야 합니다.', () => {
      const accessToken = jwt.sign(mockedAccessTokenPayload, config.jwt.secret, jwtOption);
      const decodedAccessToken = jwtHelper.decodeAccessToken(accessToken);

      expect(decodedAccessToken).not.toBeUndefined();
    });

    it('encode한 payload와 decode하여 얻은 payload는 같아야 합니다.', () => {
      const accessToken = jwt.sign(mockedAccessTokenPayload, config.jwt.secret, jwtOption);
      const decodedAccessToken = jwtHelper.decodeAccessToken(accessToken);

      expect(decodedAccessToken.idx).toBe(mockedAccessTokenPayload.idx);
      expect(decodedAccessToken.id).toBe(mockedAccessTokenPayload.id);
    });

    it('encode한 subject와 decode하여 얻은 payload의 subject는 같아야 합니다.', () => {
      const accessToken = jwt.sign(mockedAccessTokenPayload, config.jwt.secret, jwtOption);
      const decodedAccessToken = jwtHelper.decodeAccessToken(accessToken);

      expect(decodedAccessToken.sub).toBe(jwtOption.subject);
    });
  });

  describe('jwtHelper.decodeRefreshToken() 함수 테스트', () => {
    const mockedRefreshTokenPayload = { idx: 1 };
    const jwtOption: SignOptions = {
      algorithm: 'HS256',
      expiresIn: 3600,
      subject: 'REFRESH_TOKEN',
    };

    it('refresh token의 payload를 반환해야 합니다.', () => {
      const refreshToken = jwt.sign(mockedRefreshTokenPayload, config.jwt.secret, jwtOption);
      const decodedRefreshToken = jwtHelper.decodeRefreshToken(refreshToken);

      expect(decodedRefreshToken).not.toBeUndefined();
    });

    it('encode한 payload와 decode하여 얻은 payload는 같아야 합니다.', () => {
      const refreshToken = jwt.sign(mockedRefreshTokenPayload, config.jwt.secret, jwtOption);
      const decodedRefreshToken = jwtHelper.decodeRefreshToken(refreshToken);

      expect(decodedRefreshToken.idx).toBe(mockedRefreshTokenPayload.idx);
    });

    it('encode한 subject와 decode하여 얻은 payload의 subject는 같아야 합니다.', () => {
      const refreshToken = jwt.sign(mockedRefreshTokenPayload, config.jwt.secret, jwtOption);
      const decodedRefreshToken = jwtHelper.decodeRefreshToken(refreshToken);

      expect(decodedRefreshToken.sub).toBe(jwtOption.subject);
    });
  });

  describe('jwtHelper.getRefreshExpiresInMs() 함수 테스트', () => {
    it('시간 단위로 작성된 refresh token 만료시간을 밀리세컨드 단위로 변환해야 합니다.', () => {
      const refreshExpiresinMs = config.jwt.expire.refresh * 1000 * 60 * 60;
      expect(jwtHelper.getRefreshExpiresInMs()).toBe(refreshExpiresinMs);
    });
  });
});
