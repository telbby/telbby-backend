/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import multer from 'multer';

import validateToken from '../../middlewares/validate-token';
import {
  createProjectValidation,
  projectIdValidation,
  updateProjectValidation,
} from '../../validation/projects';
import {
  handleCreateProject,
  handleDeleteProject,
  handleGetProject,
  handleGetUserProjects,
  handleUpdateProject,
} from './projects.controller';

const router = Router();

router.post('/', validateToken, createProjectValidation, handleCreateProject);
router.get('/', validateToken, handleGetUserProjects);

router.get('/:id', validateToken, projectIdValidation, handleGetProject);
router.patch(
  '/:id',
  validateToken,
  multer().single('image'),
  updateProjectValidation,
  handleUpdateProject,
);
router.delete('/:id', validateToken, projectIdValidation, handleDeleteProject);

export default router;
