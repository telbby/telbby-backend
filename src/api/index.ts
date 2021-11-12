import { Router } from 'express';

import auth from './routes/auth';
import services from './routes/services';
import users from './routes/users';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/services', services);

export default router;
