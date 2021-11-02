import jwt, { SignOptions } from 'jsonwebtoken';

import JwtHelper, { JwtOptions } from '../../src/helpers/jwt';

describe('jwtHelper 모듈 테스트', () => {
  const mockJwtOptions: JwtOptions = {
    algorithm: 'HS256',
    secret: 'jwt-secret',
    accessExpiresInHour: 10,
    refreshExpiresInHour: 20,
  };

  describe('jwtHelper.generateAccessToken() 함수 테스트', () => {
    const mockedAccessTokenPayload = { idx: 1, id: 'testID' };

    it('access token을 반환해야 합니다.', () => {
      const jwtHelper = new JwtHelper(mockJwtOptions);

      const accessToken = jwtHelper.generateAccessToken(mockedAccessTokenPayload);

      expect(accessToken).not.toBeUndefined();
    });

    it('주어진 payload로 access token을 생성해야 합니다.', () => {
      const jwtHelper = new JwtHelper(mockJwtOptions);

      const accessToken = jwtHelper.generateAccessToken(mockedAccessTokenPayload);

      const decodedAccessToken = jwt.verify(accessToken, mockJwtOptions.secret, {
        algorithms: [mockJwtOptions.algorithm],
        subject: 'ACCESS_TOKEN',
      }) as { idx: number; id: string };

      expect(decodedAccessToken.idx).toBe(mockedAccessTokenPayload.idx);
      expect(decodedAccessToken.id).toBe(mockedAccessTokenPayload.id);
    });

    it('생성된 access token의 subject는 "ACCESS_TOKEN"이어야 합니다.', () => {
      const jwtHelper = new JwtHelper(mockJwtOptions);

      const accessToken = jwtHelper.generateAccessToken(mockedAccessTokenPayload);

      const decodedAccessToken = jwt.verify(accessToken, mockJwtOptions.secret, {
        algorithms: [mockJwtOptions.algorithm],
        subject: 'ACCESS_TOKEN',
      }) as { sub: string };

      expect(decodedAccessToken.sub).toBe('ACCESS_TOKEN');
    });
  });

  describe('jwtHelper.generateRefreshToken() 함수 테스트', () => {
    const mockedRefreshTokenPayload = { idx: 1 };

    it('refresh token을 반환해야 합니다.', () => {
      const jwtHelper = new JwtHelper(mockJwtOptions);

      const refreshToken = jwtHelper.generateRefreshToken(mockedRefreshTokenPayload);

      expect(refreshToken).not.toBeUndefined();
    });

    it('주어진 payload로 refresh token을 생성해야 합니다.', () => {
      const jwtHelper = new JwtHelper(mockJwtOptions);

      const refreshToken = jwtHelper.generateRefreshToken(mockedRefreshTokenPayload);

      const decodedRefreshToken = jwt.verify(refreshToken, mockJwtOptions.secret, {
        algorithms: [mockJwtOptions.algorithm],
        subject: 'REFRESH_TOKEN',
      }) as { idx: number };

      expect(decodedRefreshToken.idx).toBe(mockedRefreshTokenPayload.idx);
    });

    it('생성된 refresh token의 subject는 "REFRESH_TOKEN"이어야 합니다.', () => {
      const jwtHelper = new JwtHelper(mockJwtOptions);

      const refreshToken = jwtHelper.generateRefreshToken(mockedRefreshTokenPayload);

      const decodedRefreshToken = jwt.verify(refreshToken, mockJwtOptions.secret, {
        algorithms: [mockJwtOptions.algorithm],
        subject: 'REFRESH_TOKEN',
      }) as { sub: string };

      expect(decodedRefreshToken.sub).toBe('REFRESH_TOKEN');
    });
  });

  describe('jwtHelper.generateJwtTokens() 함수 테스트', () => {
    const mockedJwtTokensPayload = { idx: 1, id: 'testID' };

    it('access token과 refresh token을 반환해야 합니다.', () => {
      const jwtHelper = new JwtHelper(mockJwtOptions);

      const jwtTokens = jwtHelper.generateJwtTokens(mockedJwtTokensPayload);

      expect(jwtTokens.access).not.toBeUndefined();
      expect(jwtTokens.refresh).not.toBeUndefined();
    });
  });

  describe('jwtHelper.decodeAccessToken() 함수 테스트', () => {
    const mockedAccessTokenPayload = { idx: 1, id: 'testID' };
    const mockAccessTokenOption: SignOptions = {
      algorithm: mockJwtOptions.algorithm,
      expiresIn: mockJwtOptions.accessExpiresInHour,
      subject: 'ACCESS_TOKEN',
    };

    it('access token의 payload를 반환해야 합니다.', () => {
      const jwtHelper = new JwtHelper(mockJwtOptions);

      const accessToken = jwt.sign(
        mockedAccessTokenPayload,
        mockJwtOptions.secret,
        mockAccessTokenOption,
      );
      const decodedAccessToken = jwtHelper.decodeAccessToken(accessToken);

      expect(decodedAccessToken).not.toBeUndefined();
    });

    it('encode한 payload와 decode하여 얻은 payload는 같아야 합니다.', () => {
      const jwtHelper = new JwtHelper(mockJwtOptions);

      const accessToken = jwt.sign(
        mockedAccessTokenPayload,
        mockJwtOptions.secret,
        mockAccessTokenOption,
      );
      const decodedAccessToken = jwtHelper.decodeAccessToken(accessToken);

      expect(decodedAccessToken.idx).toBe(mockedAccessTokenPayload.idx);
      expect(decodedAccessToken.id).toBe(mockedAccessTokenPayload.id);
    });

    it('encode한 subject와 decode하여 얻은 payload의 subject는 같아야 합니다.', () => {
      const jwtHelper = new JwtHelper(mockJwtOptions);

      const accessToken = jwt.sign(
        mockedAccessTokenPayload,
        mockJwtOptions.secret,
        mockAccessTokenOption,
      );
      const decodedAccessToken = jwtHelper.decodeAccessToken(accessToken);

      expect(decodedAccessToken.sub).toBe(mockAccessTokenOption.subject);
    });
  });

  describe('jwtHelper.decodeRefreshToken() 함수 테스트', () => {
    const mockedRefreshTokenPayload = { idx: 1 };
    const mockRefreshTokenOption: SignOptions = {
      algorithm: mockJwtOptions.algorithm,
      expiresIn: mockJwtOptions.refreshExpiresInHour,
      subject: 'REFRESH_TOKEN',
    };

    it('refresh token의 payload를 반환해야 합니다.', () => {
      const jwtHelper = new JwtHelper(mockJwtOptions);

      const refreshToken = jwt.sign(
        mockedRefreshTokenPayload,
        mockJwtOptions.secret,
        mockRefreshTokenOption,
      );
      const decodedRefreshToken = jwtHelper.decodeRefreshToken(refreshToken);

      expect(decodedRefreshToken).not.toBeUndefined();
    });

    it('encode한 payload와 decode하여 얻은 payload는 같아야 합니다.', () => {
      const jwtHelper = new JwtHelper(mockJwtOptions);

      const refreshToken = jwt.sign(
        mockedRefreshTokenPayload,
        mockJwtOptions.secret,
        mockRefreshTokenOption,
      );
      const decodedRefreshToken = jwtHelper.decodeRefreshToken(refreshToken);

      expect(decodedRefreshToken.idx).toBe(mockedRefreshTokenPayload.idx);
    });

    it('encode한 subject와 decode하여 얻은 payload의 subject는 같아야 합니다.', () => {
      const jwtHelper = new JwtHelper(mockJwtOptions);

      const refreshToken = jwt.sign(
        mockedRefreshTokenPayload,
        mockJwtOptions.secret,
        mockRefreshTokenOption,
      );
      const decodedRefreshToken = jwtHelper.decodeRefreshToken(refreshToken);

      expect(decodedRefreshToken.sub).toBe(mockRefreshTokenOption.subject);
    });
  });

  describe('jwtHelper.getRefreshExpiresInMs() 함수 테스트', () => {
    it('시간 단위로 작성된 refresh token 만료시간을 밀리세컨드 단위로 변환해야 합니다.', () => {
      const jwtHelper = new JwtHelper(mockJwtOptions);

      const refreshExpiresinMs = mockJwtOptions.refreshExpiresInHour * 1000 * 60 * 60;
      expect(jwtHelper.getRefreshExpiresInMs()).toBe(refreshExpiresinMs);
    });
  });
});
