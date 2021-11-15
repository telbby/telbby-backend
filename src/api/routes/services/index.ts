/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import validateToken from '../../middlewares/validate-token';
import { serviceIdValidation } from '../../validation/services';
import { handleGetService, handleGetUserServices } from './services.controller';

const router = Router();

router.get('/id/:id', serviceIdValidation, handleGetService);
router.get('/user', validateToken, handleGetUserServices);

export default router;
