import { idValidator, pwValidator } from '../../src/utils/validation';

describe('validation utils 테스트', () => {
  describe('idValidator() 함수 테스트', () => {
    it(`공백문자열은 거짓을 반환해야 합니다.`, () => {
      expect(idValidator('')).toBe(false);
    });
    it(`4자보다 길이가 짧을 경우 거짓을 반환해야 합니다.`, () => {
      expect(idValidator('a')).toBe(false);
      expect(idValidator('aaa')).toBe(false);
    });
    it(`30자보다 길이가 길 경우 거짓을 반환해야 합니다.`, () => {
      const MAX_LENGTH = 30;
      expect(idValidator('a'.repeat(MAX_LENGTH + 1))).toBe(false);
    });
    it(`4자일 경우 참을 반환해야 합니다.`, () => {
      expect(idValidator('asdf')).toBe(true);
    });
    it(`30자일 경우 참을 반환해야 합니다.`, () => {
      const MAX_LENGTH = 30;
      expect(idValidator('a'.repeat(MAX_LENGTH))).toBe(true);
    });
    it(`특수문자가 포함될 경우 거짓을 반환해야 합니다.`, () => {
      expect(idValidator('ABCabc!@#')).toBe(false);
    });
    it(`숫자로 시작할 경우 거짓을 반환해야 합니다.`, () => {
      expect(idValidator('123ABC')).toBe(false);
      expect(idValidator('1asd')).toBe(false);
    });
    it('4 ~ 30자 사이의 영문자로 시작하는 영대소문자 + 숫자 조합은 참을 반환해야 합니다.', () => {
      expect(idValidator('ABCabc123')).toBe(true);
      expect(idValidator('ABC123')).toBe(true);
      expect(idValidator('a321bc')).toBe(true);
    });
    it('4 ~ 30자 사이의 영문자로 시작하는 영대문자 + 영소문자 조합은 참을 반환해야 합니다.', () => {
      expect(idValidator('ABCabc')).toBe(true);
      expect(idValidator('ABCbbb')).toBe(true);
      expect(idValidator('aCCCaaab')).toBe(true);
    });
  });

  describe('pwValidator() 함수 테스트', () => {
    it(`공백문자열은 거짓을 반환해야 합니다.`, () => {
      expect(pwValidator('')).toBe(false);
    });
    it(`10자보다 길이가 짧을 경우 거짓을 반환해야 합니다.`, () => {
      expect(pwValidator('a1')).toBe(false);
      expect(pwValidator('bbb111bbb')).toBe(false);
      expect(pwValidator('12345678a')).toBe(false);
    });
    it(`35자보다 길이가 길 경우 거짓을 반환해야 합니다.`, () => {
      const MAX_LENGTH = 35;
      expect(pwValidator('1'.repeat(MAX_LENGTH) + 'a')).toBe(false);
    });
    it(`10자일 경우 참을 반환해야 합니다.`, () => {
      expect(pwValidator('123456789a')).toBe(true);
    });
    it(`35자일 경우 참을 반환해야 합니다.`, () => {
      const MAX_LENGTH = 35;
      expect(pwValidator('1'.repeat(MAX_LENGTH - 1) + 'a')).toBe(true);
    });
    it('10 ~ 35자 사이의 영대문자 + 영소문자 조합은 참을 반환해야 합니다. ', () => {
      expect(pwValidator('ABCabcABCa')).toBe(true);
      expect(pwValidator('abAbabABab')).toBe(true);
      expect(pwValidator('aaaBBBaaaB')).toBe(true);
    });
    it('10 ~ 35자 사이의 영대문자 + 숫자 조합은 참을 반환해야 합니다. ', () => {
      expect(pwValidator('ABC123ABC123')).toBe(true);
      expect(pwValidator('AB12AB12ABB')).toBe(true);
      expect(pwValidator('BBB111BBB111')).toBe(true);
    });
    it('10 ~ 35자 사이의 영대문자 + 특수문자 조합은 참을 반환해야 합니다. ', () => {
      expect(pwValidator('ABC!@$ABC!@$')).toBe(true);
      expect(pwValidator('AB!@AB!@AB!')).toBe(true);
      expect(pwValidator('BBB!@$BBB!@$')).toBe(true);
    });
    it('10 ~ 35자 사이의 영소문자 + 숫자 조합은 참을 반환해야 합니다. ', () => {
      expect(pwValidator('abc123abc123')).toBe(true);
      expect(pwValidator('ab12ab12abb')).toBe(true);
      expect(pwValidator('bbb111bbb111')).toBe(true);
    });
    it('10 ~ 35자 사이의 영소문자 + 특수문자 조합은 참을 반환해야 합니다. ', () => {
      expect(pwValidator('abc!@$abc!@$')).toBe(true);
      expect(pwValidator('ab!@ab!@ab!')).toBe(true);
      expect(pwValidator('bbb!@$bbb!@$')).toBe(true);
    });
    it('10 ~ 35자 사이의 숫자 + 특수문자 조합은 참을 반환해야 합니다. ', () => {
      expect(pwValidator('123!@$123!@$')).toBe(true);
      expect(pwValidator('12!@12!@12!')).toBe(true);
      expect(pwValidator('222!@$222!@$')).toBe(true);
    });
  });
});
