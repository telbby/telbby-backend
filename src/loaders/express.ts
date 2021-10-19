import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import config from '../config';
import routes from '../api';

export default (app: Application): void => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors(config.corsOptions));

  app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));

  app.use(config.api.prefix, routes);

  app.all('*', (req, res, _next) => {
    res.status(404).send('404');
  });
};
