import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import config from '../config';
import routes from '../api';
import ErrorResponse from '../utils/error-response';
import errorHandler from '../api/middlewares/error';
import { commonError } from '../constants/error';

export default (app: Application): void => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors(config.corsOptions));

  app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));

  app.use(config.api.prefix, routes);

  app.all('*', (_req, _res, next) => {
    next(new ErrorResponse(commonError.notFound));
  });
  app.use(errorHandler);
};
