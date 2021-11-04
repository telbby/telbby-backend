import { Router } from 'express';

import { loginValidation, refreshValidation } from '../../validation/auth';
import { handleLogin, handleLogout, handleRefresh } from './auth.controller';

const router = Router();

router.post('/', loginValidation, handleLogin);
router.get('/', refreshValidation, handleRefresh);
router.delete('/', handleLogout);

export default router;
