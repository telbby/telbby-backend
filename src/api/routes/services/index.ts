import { Router } from 'express';

import { getServiceValidation } from '../../validation/services';
import { handleGetService } from './services.controller';

const router = Router();

router.get('/:id', getServiceValidation, handleGetService);

export default router;
