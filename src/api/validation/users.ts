import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

import ErrorResponse from '../../utils/error-response';

export const userTestValidation = (req: Request, _res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    idx: Joi.number().required().messages({
      'any.required': `사용자 고유번호를 입력해주세요`,
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
