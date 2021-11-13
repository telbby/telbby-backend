import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

import ServiceService from '../../../services/service';
import { getAccessToken, getUIDFromToken } from '../../../utils/jwt';

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

export const handleGetUserServices = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const uid = getUIDFromToken(getAccessToken(req.headers.authorization));

    const serviceServiceInstance = Container.get(ServiceService);
    const result = await serviceServiceInstance.getAllServiceOfUser(uid);

    res.json(result);
  } catch (e) {
    next(e);
  }
};
