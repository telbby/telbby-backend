import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { idValidator, pwValidator } from '@telbby/validation';

import ErrorResponse from '../../utils/error-response';
import { LoginRequestBody } from '../../types';

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
  const { userId = '', password = '' } = req.body as LoginRequestBody;

  const [isIdValid, idWarningMessage] = idValidator(userId);
  const [isPwValid, pwWarningMessage] = pwValidator(password);

  if (!isIdValid || !isPwValid) {
    throw new ErrorResponse({
      statusCode: 400,
      message: idWarningMessage || pwWarningMessage,
    });
  }

  next();
};
