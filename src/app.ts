import express, { Application } from 'express';

import config from './config';
import loadApp from './loaders';

const startServer = () => {
  const app: Application = express();

  loadApp(app);
  app.listen(config.port);
};

try {
  startServer();
  console.info(`Server Run on ${config.port}`);
} catch (err) {
  console.error('Server Run Failed');
  process.exit(1);
}
