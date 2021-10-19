import { Router } from 'express';
import { handleUserTest } from './users.controller';

const router = Router();

router.get('/', handleUserTest);

export default router;
