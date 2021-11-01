import { NextFunction, Request, Response } from 'express';

export const handleAuthTest = (_req: Request, res: Response, next: NextFunction): void => {
  try {
    res.status(200).json('auth router test');
  } catch (e) {
    next(e);
  }
};
