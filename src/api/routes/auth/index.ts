import { Router } from 'express';

import { loginValidation, refreshValidation } from '../../validation/auth';
import { handleLogin, handleLogout, handleRefresh } from './auth.controller';

const router = Router();

router.post('/login', loginValidation, handleLogin);
router.get('/refresh', refreshValidation, handleRefresh);
router.get('/logout', handleLogout);

export default router;
