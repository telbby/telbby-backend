/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import multer from 'multer';

import validateToken from '../../middlewares/validate-token';
import {
  createServiceValidation,
  editServiceValidation,
  serviceIdValidation,
} from '../../validation/services';
import {
  handleCreateService,
  handleDeleteService,
  handleEditService,
  handleGetService,
  handleGetUserServices,
} from './services.controller';

const router = Router();

router.post('/', validateToken, createServiceValidation, handleCreateService);
router.get('/id/:id', validateToken, serviceIdValidation, handleGetService);
router.get('/user', validateToken, handleGetUserServices);
router.patch(
  '/id/:id',
  validateToken,
  multer().single('image'),
  editServiceValidation,
  handleEditService,
);
router.delete('/id/:id', validateToken, serviceIdValidation, handleDeleteService);

export default router;
