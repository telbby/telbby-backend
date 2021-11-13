import { NextFunction, Request, Response } from 'express';

import { commonError } from '../../constants/error';
import ErrorResponse from '../../utils/error-response';
import { checkTokenExpiration, getAccessToken, getRefreshToken } from '../../utils/jwt';

const validateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const accessToken = getAccessToken(req.headers.authorization);
    const refreshToken = getRefreshToken(req.cookies);

    if (!accessToken || !refreshToken) {
      throw new ErrorResponse(commonError.unauthorized);
    }

    const isTokenExpired = await checkTokenExpiration(accessToken);

    if (isTokenExpired) {
      res.redirect(303, '/api/auth?redirect=true');
      return;
    }

    next();
  } catch (e) {
    next(e);
  }
};

export default validateToken;
