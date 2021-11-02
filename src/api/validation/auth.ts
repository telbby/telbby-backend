import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

import {
  REFRESH_TOKEN_COOKIE_KEY,
  USER_ID_MAX_LENGTH,
  USER_ID_MIN_LENGTH,
  USER_PW_MAX_LENGTH,
  USER_PW_MIN_LENGTH,
} from '../../constants/auth';
import { commonError } from '../../constants/error';
import ErrorResponse from '../../utils/error-response';

export const loginValidation = (req: Request, _res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    id: Joi.string()
      .min(USER_ID_MIN_LENGTH)
      .max(USER_ID_MAX_LENGTH)
      .required()
      .empty('')
      .messages({
        'string.min': `아이디는 ${USER_ID_MIN_LENGTH}자 이상 입력해야 합니다`,
        'string.max': `아이디는 ${USER_ID_MAX_LENGTH}자를 넘길 수 없습니다`,
        'any.required': `아이디를 입력해주세요`,
      }),
    password: Joi.string()
      .min(USER_PW_MIN_LENGTH)
      .max(USER_PW_MAX_LENGTH)
      .required()
      .empty('')
      .messages({
        'string.min': `비밀번호는 ${USER_PW_MIN_LENGTH}자 이상 입력해야 합니다`,
        'string.max': `비밀번호는 ${USER_PW_MAX_LENGTH}자를 넘길 수 없습니다`,
        'any.required': `비밀번호를 입력해주세요`,
      }),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    throw new ErrorResponse({
      statusCode: 400,
      message: validationResult.error.message,
    });
  }

  next();
};

export const refreshValidation = (req: Request, _res: Response, next: NextFunction): void => {
  const refreshRequestCookies = req.cookies as { [REFRESH_TOKEN_COOKIE_KEY]: string };
  const refreshToken = refreshRequestCookies[REFRESH_TOKEN_COOKIE_KEY];

  if (!refreshToken) {
    throw new ErrorResponse(commonError.unauthorized);
  }

  next();
};
