import { CookieOptions, NextFunction, Request, Response } from 'express';
import Container from 'typedi';

import { REFRESH_TOKEN_COOKIE_KEY } from '../../../constants/auth';
import * as jwtHelper from '../../../helpers/jwt';
import AuthService from '../../../services/auth';

export type LoginRequestBodyType = { id: string; password: string };

export const handleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id, password } = req.body as LoginRequestBodyType;

    const authServiceInstance = Container.get(AuthService);

    const { access, refresh } = await authServiceInstance.login(id, password);

    const refreshTokenExpires = new Date(Date.now() + jwtHelper.getRefreshExpiresInMs());
    const refreshTokenCookieOptions: CookieOptions = {
      expires: refreshTokenExpires,
      secure: false,
      httpOnly: true,
    };
    res.cookie(REFRESH_TOKEN_COOKIE_KEY, refresh, refreshTokenCookieOptions);

    res.status(200).json({ access });
  } catch (e) {
    next(e);
  }
};

export const handleLogout = (_req: Request, res: Response, next: NextFunction): void => {
  try {
    res.clearCookie(REFRESH_TOKEN_COOKIE_KEY);
    res.status(200).end();
  } catch (e) {
    next(e);
  }
};

export type RefreshRequestCookiesType = { [REFRESH_TOKEN_COOKIE_KEY]: string };

export const handleRefresh = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authServiceInstance = Container.get(AuthService);

    const refreshRequestCookies = req.cookies as RefreshRequestCookiesType;
    const refreshToken = refreshRequestCookies[REFRESH_TOKEN_COOKIE_KEY];

    const { access } = await authServiceInstance.refreshAccessToken(refreshToken);

    res.status(200).json({ access });
  } catch (e) {
    next(e);
  }
};
