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
    const { idx } = req.query;

    const userServiceInstance = Container.get(UserService);
    const user = await userServiceInstance.getUser(Number(idx));

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
    const { id, password } = req.body as CreateUserRequestBody;

    const userServiceInstance = Container.get(UserService);
    const { idx, createdAt, updatedAt } = await userServiceInstance.createUser(id, password);

    res.json({ idx, createdAt, updatedAt });
  } catch (e) {
    next(e);
  }
};
