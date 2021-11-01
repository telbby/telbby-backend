import bcrypt from 'bcrypt';

import * as hashHelper from '../../src/helpers/hash';

describe('hashHelper 모듈 테스트', () => {
  describe('hashHelper.generateHash() 함수 테스트', () => {
    const mockedPw = 'testPW';

    it('bcrypt를 사용해 암호화된 문자열이 반환되어야 합니다.', () => {
      const hashedPw = hashHelper.generateHash(mockedPw);
      expect(hashedPw).toBeDefined();
    });

    it('암호화된 문자열과 암호화되지 않은 문자열을 bcrypt.compareSync로 비교했을 때 참이어야 합니다.', () => {
      const hashedPw = hashHelper.generateHash(mockedPw);
      const isValid = bcrypt.compareSync(mockedPw, hashedPw);
      expect(isValid).toBeTruthy();
    });

    it('암호화된 문자열과 원본과 다른 문자열을 bcrypt.compareSync로 비교했을 때 참이어야 합니다.', () => {
      const hashedPw = hashHelper.generateHash(mockedPw);
      const isValid = bcrypt.compareSync(`${mockedPw}dif`, hashedPw);
      expect(isValid).toBeFalsy();
    });

    it('같은 문자열을 암호화해도 다른 결과물이 나와야 합니다.', () => {
      const hashedPwOne = hashHelper.generateHash(mockedPw);
      const hashedPwTwo = hashHelper.generateHash(mockedPw);
      expect(hashedPwOne).not.toBe(hashedPwTwo);
    });
  });

  describe('hashHelper.comparePassword() 함수 테스트', () => {
    const mockedPw = 'testPW';

    it('bcrypt를 사용해 암호화된 문자열과 원본 문자열을 비교했을 때 참을 반환해야 합니다.', () => {
      const salt = bcrypt.genSaltSync(10);
      const hashedPw = bcrypt.hashSync(mockedPw, salt);
      const isValid = hashHelper.comparePassword(hashedPw, mockedPw);
      expect(isValid).toBeTruthy();
    });

    it('bcrypt를 사용해 암호화된 문자열과 원본과 다른 문자열을 비교했을 때 거짓을 반환해야 합니다.', () => {
      const salt = bcrypt.genSaltSync(10);
      const hashedPw = bcrypt.hashSync(mockedPw, salt);
      const isValid = hashHelper.comparePassword(hashedPw, `${mockedPw}dif`);
      expect(isValid).toBeFalsy();
    });

    it('bcrypt를 사용해 암호화된 문자열과 원본과 빈 문자열을 비교했을 때 거짓을 반환해야 합니다.', () => {
      const salt = bcrypt.genSaltSync(10);
      const hashedPw = bcrypt.hashSync(mockedPw, salt);
      const isValid = hashHelper.comparePassword(hashedPw, '');
      expect(isValid).toBeFalsy();
    });
  });
});
