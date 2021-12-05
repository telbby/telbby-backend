import { Router } from 'express';

import auth from './routes/auth';
import projects from './routes/projects';
import users from './routes/users';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/projects', projects);

export default router;
