import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

import ErrorResponse from '../../utils/error-response';
import { commonError } from '../../constants/error';

export const userTestValidation = (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = Joi.object({
      id: Joi.number().required().messages({
        'any.required': `아이디를 입력해주세요`,
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
  } catch (e) {
    throw new ErrorResponse(commonError.wrong);
  }
};
