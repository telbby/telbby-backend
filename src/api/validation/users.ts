import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

import {
  USER_ID_MAX_LENGTH,
  USER_ID_MIN_LENGTH,
  USER_PW_MAX_LENGTH,
  USER_PW_MIN_LENGTH,
} from '../../constants/users';
import ErrorResponse from '../../utils/error-response';
import { REG_ID, REG_PW } from '../../utils/validation';

export const userTestValidation = (req: Request, _res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    uid: Joi.string().required().messages({
      'any.required': `사용자 고유코드를 입력해주세요`,
    }),
  });

  const validationResult = schema.validate(req.query);

  if (validationResult.error) {
    throw new ErrorResponse({
      statusCode: 400,
      message: validationResult.error.message,
    });
  }

  next();
};

export const userCreateValidation = (req: Request, _res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    userId: Joi.string()
      .min(USER_ID_MIN_LENGTH)
      .max(USER_ID_MAX_LENGTH)
      .required()
      .empty('')
      .regex(REG_ID)
      .messages({
        'string.min': `아이디는 ${USER_ID_MIN_LENGTH}자 이상 입력해야 합니다`,
        'string.max': `아이디는 ${USER_ID_MAX_LENGTH}자를 넘길 수 없습니다`,
        'string.pattern.base': `아이디는 ${USER_ID_MIN_LENGTH} ~ ${USER_ID_MAX_LENGTH}자 사이면서 영대소문자, 숫자만 사용할 수 있고 영문자로 시작해야 합니다.`,
        'any.required': `아이디를 입력해주세요`,
      }),
    password: Joi.string()
      .min(USER_PW_MIN_LENGTH)
      .max(USER_PW_MAX_LENGTH)
      .required()
      .empty('')
      .regex(REG_PW)
      .messages({
        'string.min': `비밀번호는 ${USER_PW_MIN_LENGTH}자 이상 입력해야 합니다`,
        'string.max': `비밀번호는 ${USER_PW_MAX_LENGTH}자를 넘길 수 없습니다`,
        'string.pattern.base': `비밀번호는 ${USER_PW_MIN_LENGTH} ~ ${USER_PW_MAX_LENGTH}자 사이면서 영대소문자, 숫자, 특수문자 중 2개 이상 조합이어야 합니다`,
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
