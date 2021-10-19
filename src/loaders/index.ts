import 'reflect-metadata';
import connect from './connect';
import entityInjector from './entity-injector';
import { Application } from 'express';

import expressLoader from './express';

export default async (app: Application) => {
  await connect();
  console.info('Database connected');

  entityInjector();
  console.info('entities injected');

  expressLoader(app);
  console.info('Express loaded');
};
