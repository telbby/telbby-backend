import { Application } from 'express';

import expressLoader from './express';

export default (app: Application) => {
  expressLoader(app);
  console.info('Express loaded');
};
