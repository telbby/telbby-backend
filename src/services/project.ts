import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { cloudinaryError, commonError, themeError } from '../constants/error';
import ProjectEntity from '../entity/project';

import ProjectRepository from '../repositories/project';
import ThemeRepository from '../repositories/theme';
import UserRepository from '../repositories/user';
import { UpdateInfo } from '../types';
import { EditableProjectInfo, InsertableProjectInfo, ProjectBasicInfo } from '../types/project';
import { uploadBufferOnCloudinary } from '../utils/cloudinary';
import ErrorResponse from '../utils/error-response';

@Service()
class ProjectService {
  private projectRepository: ProjectRepository;

  private userRepository: UserRepository;

  private themeRepository: ThemeRepository;

  constructor(
    @InjectRepository(ProjectRepository) projectRepository: ProjectRepository,
    @InjectRepository(UserRepository) userRepository: UserRepository,
    @InjectRepository(ThemeRepository) themeRepository: ThemeRepository,
  ) {
    this.projectRepository = projectRepository;
    this.userRepository = userRepository;
    this.themeRepository = themeRepository;
  }

  async getProject(uid: string, id: number): Promise<ProjectEntity> {
    const project = await this.projectRepository.findByProjectId(id);

    if (!project) {
      throw new ErrorResponse(commonError.notFound);
    }

    if (project.user.uid !== uid) {
      throw new ErrorResponse(commonError.forbidden);
    }

    return project;
  }

  async getAllProjectAndCountOfUser(
    uid: string,
  ): Promise<{ projectList: ProjectEntity[]; count: number }> {
    const [projectList, count] = await this.projectRepository.findAndCountByUserId(uid);
    return { projectList, count };
  }

  async createProject(
    uid: string,
    projectInfo: ProjectBasicInfo,
  ): Promise<{ id: number } & UpdateInfo> {
    const theme = await this.themeRepository.findById(1);
    const user = await this.userRepository.findByUid(uid);

    if (!theme) {
      throw new ErrorResponse(themeError.needDefaultTheme);
    }

    if (!user) {
      throw new ErrorResponse(commonError.unauthorized);
    }

    const project = await this.projectRepository.createProject(projectInfo, theme, user);

    const { id, createdAt, updatedAt } = project;
    return { id, createdAt, updatedAt };
  }

  async updateProject(
    uid: string,
    projectId: number,
    projectInfo: EditableProjectInfo,
  ): Promise<{ id: number } & UpdateInfo> {
    const project = await this.projectRepository.findByProjectId(projectId);
    const { themeId, image, ...rest } = projectInfo;

    const updateData: InsertableProjectInfo = rest;

    if (!project) {
      throw new ErrorResponse(commonError.notFound);
    }

    if (uid !== project.user.uid) {
      throw new ErrorResponse(commonError.forbidden);
    }

    if (themeId) {
      const theme = await this.themeRepository.findById(themeId);
      if (!theme) throw new ErrorResponse(themeError.needDefaultTheme);

      updateData.theme = theme;
    }

    if ('buffer' in image) {
      try {
        updateData.image = await uploadBufferOnCloudinary(image.buffer);
      } catch {
        throw new ErrorResponse(cloudinaryError.wrong);
      }
    }

    const editedProject = await this.projectRepository.updateProject(project, updateData);

    const { id, createdAt, updatedAt } = editedProject;
    return { id, createdAt, updatedAt };
  }

  async deleteProject(uid: string, projectId: number): Promise<void> {
    const project = await this.projectRepository.findByProjectId(projectId);

    if (!project) {
      throw new ErrorResponse(commonError.notFound);
    }

    if (uid !== project.user.uid) {
      throw new ErrorResponse(commonError.forbidden);
    }

    await this.projectRepository.deleteProject(project);
  }
}

export default ProjectService;
