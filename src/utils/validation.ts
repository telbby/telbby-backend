import {
  USER_ID_MAX_LENGTH,
  USER_ID_MIN_LENGTH,
  USER_PW_MAX_LENGTH,
  USER_PW_MIN_LENGTH,
} from '../constants/users';

export const REG_ID = new RegExp(
  `^[a-zA-Z]+[a-zA-Z0-9]{${USER_ID_MIN_LENGTH},${USER_ID_MAX_LENGTH}}$`,
);

export const REG_PW = new RegExp(
  [
    '^',
    `(?=.*[A-Z])(?=.*[a-z])([^\\s]){${USER_PW_MIN_LENGTH},${USER_PW_MAX_LENGTH}}|`,
    `(?=.*[A-Z])(?=.*[0-9])([^\\s]){${USER_PW_MIN_LENGTH},${USER_PW_MAX_LENGTH}}|`,
    `(?=.*[A-Z])(?=.*[<>{}|;:.,~!?@#$%^=&*\\"\\\\/])([^\\s]){${USER_PW_MIN_LENGTH},${USER_PW_MAX_LENGTH}}|`,
    `(?=.*[a-z])(?=.*[0-9])([^\\s]){${USER_PW_MIN_LENGTH},${USER_PW_MAX_LENGTH}}|`,
    `(?=.*[a-z])(?=.*[<>{}|;:.,~!?@#$%^=&*\\"\\/])([^\\s]){${USER_PW_MIN_LENGTH},${USER_PW_MAX_LENGTH}}|`,
    `(?=.*[0-9])(?=.*[<>{}|;:.,~!?@#$%^=&*\\"\\\\/])([^\\s]){${USER_PW_MIN_LENGTH},${USER_PW_MAX_LENGTH}}`,
    '$',
  ].reduce((acc, cur) => acc + cur, ''),
);

export const idValidator = (id: string): boolean => REG_ID.test(id);
export const pwValidator = (pw: string): boolean => REG_PW.test(pw);
