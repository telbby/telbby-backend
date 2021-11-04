import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

import UserService from '../../../services/user';
import { CreateUserRequestBody } from '../../../types';

export const handleUserTest = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { uid } = req.query;

    const userServiceInstance = Container.get(UserService);
    const user = await userServiceInstance.getUser(uid?.toString() ?? '');

    res.json(user);
  } catch (e) {
    next(e);
  }
};

export const handleCreateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userInfoToCreate = req.body as CreateUserRequestBody;

    const userServiceInstance = Container.get(UserService);
    const { uid, createdAt, updatedAt } = await userServiceInstance.createUser(userInfoToCreate);

    res.json({ uid, createdAt, updatedAt });
  } catch (e) {
    next(e);
  }
};
