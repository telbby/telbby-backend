import { Router } from 'express';

import { handleUserTest } from './users.controller';
import { userTestValidation } from '../../validation/user';

const router = Router();

router.get('/', userTestValidation, handleUserTest);

export default router;
