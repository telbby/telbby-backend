import { CookieOptions, NextFunction, Request, Response } from 'express';
import Container from 'typedi';

import { REFRESH_TOKEN_COOKIE_KEY } from '../../../constants/auth';
import JwtHelper from '../../../helpers/jwt';
import AuthService from '../../../services/auth';
import { LoginRequestBody, RefreshRequestCookiesType } from '../../../types';

export const handleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userLoginInfo = req.body as LoginRequestBody;

    const authServiceInstance = Container.get(AuthService);
    const jwtHelper = Container.get<JwtHelper>('jwtHelper');

    const { access, refresh } = await authServiceInstance.login(userLoginInfo);

    const refreshTokenExpires = new Date(Date.now() + jwtHelper.getRefreshExpiresInMs());
    const refreshTokenCookieOptions: CookieOptions = {
      expires: refreshTokenExpires,
      secure: false,
      httpOnly: true,
    };
    res.cookie(REFRESH_TOKEN_COOKIE_KEY, refresh, refreshTokenCookieOptions);

    res.json({ access });
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

    res.json({ access });
  } catch (e) {
    next(e);
  }
};
