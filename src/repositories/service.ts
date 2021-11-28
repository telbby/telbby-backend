import { EntityRepository, Repository } from 'typeorm';

import ServiceEntity from '../entity/service';
import ThemeEntity from '../entity/theme';
import UserEntity from '../entity/user';
import { ServiceBasicInfo } from '../types/service';
import { uuidv4 } from '../utils/service';

@EntityRepository(ServiceEntity)
class ServiceRepository extends Repository<ServiceEntity> {
  async findByServiceId(id: number): Promise<ServiceEntity | undefined> {
    const service = await this.findOne({
      where: { id },
      relations: ['theme', 'user'],
    });
    return service;
  }

  async findAndCountByUserId(userId: string): Promise<[ServiceEntity[], number]> {
    const serviceListAndCount = await this.findAndCount({
      where: { user: userId },
      relations: ['theme'],
    });
    return serviceListAndCount;
  }

  async createService(
    serviceInfo: ServiceBasicInfo,
    theme: ThemeEntity,
    user: UserEntity,
  ): Promise<ServiceEntity> {
    const { name, description, domain } = serviceInfo;

    const newService = this.create({
      clientId: uuidv4(),
      name,
      description,
      domain,
      theme,
      user,
    });
    const createdService = await this.save(newService);

    return createdService;
  }

  async deleteService(service: ServiceEntity): Promise<void> {
    await this.remove(service);
  }
}

export default ServiceRepository;
