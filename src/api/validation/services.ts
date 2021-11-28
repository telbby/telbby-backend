import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

import ErrorResponse from '../../utils/error-response';

export const serviceIdValidation = (req: Request, _res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    id: Joi.number().required().messages({
      'any.required': '서비스 ID를 입력해주세요',
    }),
  });

  const validationResult = schema.validate(req.params);

  if (validationResult.error) {
    throw new ErrorResponse({
      statusCode: 400,
      message: validationResult.error.message,
    });
  }

  next();
};

export const createServiceValidation = (req: Request, _res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    name: Joi.string().required().messages({
      'any.required': '서비스 이름을 입력해주세요',
    }),
    description: Joi.string(),
    domain: Joi.string(),
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
