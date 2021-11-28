import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

import JwtHelper from '../../../helpers/jwt';
import ServiceService from '../../../services/service';
import { getAccessToken } from '../../../utils/jwt';

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
    const jwtHelper = Container.get<JwtHelper>('jwtHelper');
    const serviceServiceInstance = Container.get(ServiceService);

    const accessToken = getAccessToken(req.headers.authorization);
    const { uid } = jwtHelper.decodeAccessToken(accessToken);

    const result = await serviceServiceInstance.getAllServiceOfUser(uid);

    res.json(result);
  } catch (e) {
    next(e);
  }
};

export const handleCreateService = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const jwtHelper = Container.get<JwtHelper>('jwtHelper');
    const serviceServiceInstance = Container.get(ServiceService);

    const accessToken = getAccessToken(req.headers.authorization);
    const { uid } = jwtHelper.decodeAccessToken(accessToken);

    const result = await serviceServiceInstance.createService(uid, req.body);

    res.json(result);
  } catch (e) {
    next(e);
  }
};

export const handleDeleteService = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    const jwtHelper = Container.get<JwtHelper>('jwtHelper');
    const serviceServiceInstance = Container.get(ServiceService);

    const accessToken = getAccessToken(req.headers.authorization);
    const { uid } = jwtHelper.decodeAccessToken(accessToken);

    await serviceServiceInstance.deleteService(uid, Number(id));

    res.status(204).end();
  } catch (e) {
    next(e);
  }
};
