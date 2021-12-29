import { EntityRepository, Repository } from 'typeorm';

import ProjectEntity from '../entity/project';
import ThemeEntity from '../entity/theme';
import UserEntity from '../entity/user';
import { InsertableProjectInfo, ProjectBasicInfo } from '../types/project';
import { uuidv4 } from '../utils/project';

@EntityRepository(ProjectEntity)
class ProjectRepository extends Repository<ProjectEntity> {
  async findByProjectId(id: number): Promise<ProjectEntity | undefined> {
    const project = await this.createQueryBuilder('project')
      .where('project.id = :id', { id })
      .leftJoinAndSelect('project.theme', 'theme')
      .leftJoin('project.user', 'user')
      .addSelect(['user.uid'])
      .getOne();
    return project;
  }

  async findAndCountByUserId(userId: string): Promise<[ProjectEntity[], number]> {
    const projectListAndCount = await this.findAndCount({
      select: ['id', 'name', 'domain', 'clientId'],
      where: { user: userId },
    });
    return projectListAndCount;
  }

  async createProject(
    projectInfo: ProjectBasicInfo,
    theme: ThemeEntity,
    user: UserEntity,
  ): Promise<ProjectEntity> {
    const { name, description, domain } = projectInfo;

    const newProject = this.create({
      clientId: uuidv4(),
      name,
      description,
      domain,
      theme,
      user,
    });
    const createdProject = await this.save(newProject);

    return createdProject;
  }

  async updateProject<K extends keyof InsertableProjectInfo>(
    project: ProjectEntity,
    updateData: InsertableProjectInfo,
  ): Promise<ProjectEntity> {
    const editedProjectEntity = project;

    (Object.entries(updateData) as [K, ProjectEntity[K]][]).forEach(([key, val]) => {
      editedProjectEntity[key] = val;
    });

    const editedProject = this.save(project);

    return editedProject;
  }

  async deleteProject(project: ProjectEntity): Promise<void> {
    await this.remove(project);
  }
}

export default ProjectRepository;
