import { REFRESH_TOKEN_COOKIE_KEY } from '../constants/auth';

export interface UpdateInfo {
  createdAt: Date;
  updatedAt: Date;
}

export interface UserLoginInfo {
  id: string;
  password: string;
}

export interface RefreshCookie {
  [REFRESH_TOKEN_COOKIE_KEY]: string;
}

export type LoginRequestBody = UserLoginInfo;
export type CreateUserRequestBody = UserLoginInfo;
export type RefreshRequestCookiesType = RefreshCookie;
