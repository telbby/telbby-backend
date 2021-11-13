import { Router } from 'express';

import validateToken from '../../middlewares/validate-token';
import { getServiceValidation } from '../../validation/services';
import { handleGetService, handleGetUserServices } from './services.controller';

const router = Router();

router.get('/id/:id', getServiceValidation, handleGetService);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/user', validateToken, handleGetUserServices);

export default router;
