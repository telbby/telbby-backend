import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

import ServiceService from '../../../services/service';

export const handleGetService = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    const serviceServiceInstance = Container.get(ServiceService);
    const service = await serviceServiceInstance.getService(Number(id));

    res.json(service);
  } catch (e) {
    next(e);
  }
};
