import {
  USER_ID_MAX_LENGTH,
  USER_ID_MIN_LENGTH,
  USER_PW_MAX_LENGTH,
  USER_PW_MIN_LENGTH,
} from '../constants/users';

export const REG_ID = new RegExp(`^[a-zA-Z]+[a-zA-Z0-9]*$`);

export const REG_PW = new RegExp(
  [
    '^',
    `(?=.*[A-Z])(?=.*[a-z])([^\\s])|`,
    `(?=.*[A-Z])(?=.*[0-9])([^\\s])|`,
    `(?=.*[A-Z])(?=.*[<>{}|;:.,~!?@#$%^=&*\\"\\\\/])([^\\s])|`,
    `(?=.*[a-z])(?=.*[0-9])([^\\s])|`,
    `(?=.*[a-z])(?=.*[<>{}|;:.,~!?@#$%^=&*\\"\\\\/])([^\\s])|`,
    `(?=.*[0-9])(?=.*[<>{}|;:.,~!?@#$%^=&*\\"\\\\/])([^\\s])|`,
    '$',
  ].reduce((acc, cur) => acc + cur, ''),
);

export const idValidator = (id: string): boolean => {
  if (id.length < USER_ID_MIN_LENGTH || id.length > USER_ID_MAX_LENGTH) return false;
  return REG_ID.test(id);
};
export const pwValidator = (pw: string): boolean => {
  if (pw.length < USER_PW_MIN_LENGTH || pw.length > USER_PW_MAX_LENGTH) return false;
  return REG_PW.test(pw);
};
