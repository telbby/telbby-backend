import { Router } from 'express';

import { loginValidation } from '../../validation/auth';
import { userTestValidation } from '../../validation/users';
import { handleCreateUser, handleUserTest } from './users.controller';

const router = Router();

router.get('/', userTestValidation, handleUserTest);
router.post('/', loginValidation, handleCreateUser);

export default router;
