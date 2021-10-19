import { Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import UserService from '../../../services/user';

export const handleUserTest = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const userServiceInstance = Container.get(UserService);
    const user = await userServiceInstance.getUser(1);

    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};
