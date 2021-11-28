/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import validateToken from '../../middlewares/validate-token';
import { createServiceValidation, serviceIdValidation } from '../../validation/services';
import {
  handleCreateService,
  handleDeleteService,
  handleGetService,
  handleGetUserServices,
} from './services.controller';

const router = Router();

router.post('/', validateToken, createServiceValidation, handleCreateService);
router.get('/id/:id', validateToken, serviceIdValidation, handleGetService);
router.get('/user', validateToken, handleGetUserServices);
router.delete('/id/:id', validateToken, serviceIdValidation, handleDeleteService);

export default router;
