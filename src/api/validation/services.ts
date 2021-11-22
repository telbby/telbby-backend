import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

import { LIMIT_FILE_SIZE, VALID_IMAGE_MIMETYPE } from '../../constants/service';
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

export const editServiceValidation = (req: Request, _res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    domain: Joi.string(),
    question: Joi.string(),
    themeId: Joi.number(),
    image: Joi.object({
      fieldname: Joi.string(),
      originalname: Joi.string(),
      encoding: Joi.string(),
      mimetype: Joi.string().valid(...VALID_IMAGE_MIMETYPE),
      buffer: Joi.binary(),
      size: Joi.number().less(LIMIT_FILE_SIZE),
    }).messages({
      'number.less': `파일 크기는 ${LIMIT_FILE_SIZE} Bytes 를 넘을 수 없습니다.`,
      'any.only': '허용하지 않는 파일 형식입니다.',
    }),
  });

  const validationResult = schema.validate({ ...req.body, image: { ...req.file } });

  if (validationResult.error) {
    throw new ErrorResponse({
      statusCode: 400,
      message: validationResult.error.message,
    });
  }

  next();
};
