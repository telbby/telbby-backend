import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

import JwtHelper from '../../../helpers/jwt';
import ProjectService from '../../../services/project';
import { getAccessToken } from '../../../utils/jwt';

export const handleGetProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    const jwtHelper = Container.get<JwtHelper>('jwtHelper');
    const projectServiceInstance = Container.get(ProjectService);

    const accessToken = getAccessToken(req.headers.authorization);
    const { uid } = jwtHelper.decodeAccessToken(accessToken);

    const project = await projectServiceInstance.getProject(uid, Number(id));

    res.json(project);
  } catch (e) {
    next(e);
  }
};

export const handleGetUserProjects = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const jwtHelper = Container.get<JwtHelper>('jwtHelper');
    const projectServiceInstance = Container.get(ProjectService);

    const accessToken = getAccessToken(req.headers.authorization);
    const { uid } = jwtHelper.decodeAccessToken(accessToken);

    const result = await projectServiceInstance.getAllProjectAndCountOfUser(uid);

    res.json(result);
  } catch (e) {
    next(e);
  }
};

export const handleCreateProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const jwtHelper = Container.get<JwtHelper>('jwtHelper');
    const projectServiceInstance = Container.get(ProjectService);

    const accessToken = getAccessToken(req.headers.authorization);
    const { uid } = jwtHelper.decodeAccessToken(accessToken);

    const result = await projectServiceInstance.createProject(uid, req.body);

    res.json(result);
  } catch (e) {
    next(e);
  }
};

export const handleUpdateProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    const jwtHelper = Container.get<JwtHelper>('jwtHelper');
    const projectServiceInstance = Container.get(ProjectService);

    const accessToken = getAccessToken(req.headers.authorization);
    const { uid } = jwtHelper.decodeAccessToken(accessToken);

    const result = await projectServiceInstance.updateProject(uid, Number(id), {
      ...req.body,
      image: { ...req.file },
    });

    res.json(result);
  } catch (e) {
    next(e);
  }
};

export const handleDeleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    const jwtHelper = Container.get<JwtHelper>('jwtHelper');
    const projectServiceInstance = Container.get(ProjectService);

    const accessToken = getAccessToken(req.headers.authorization);
    const { uid } = jwtHelper.decodeAccessToken(accessToken);

    await projectServiceInstance.deleteProject(uid, Number(id));

    res.status(204).end();
  } catch (e) {
    next(e);
  }
};
