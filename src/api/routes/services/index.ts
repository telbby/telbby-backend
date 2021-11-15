/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import validateToken from '../../middlewares/validate-token';
import { createServiceValidation, serviceIdValidation } from '../../validation/services';
import {
  handleCreateService,
  handleGetService,
  handleGetUserServices,
} from './services.controller';

const router = Router();

router.post('/', validateToken, createServiceValidation, handleCreateService);
router.get('/id/:id', serviceIdValidation, handleGetService);
router.get('/user', validateToken, handleGetUserServices);

export default router;
