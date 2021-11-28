import { EntityRepository, Repository } from 'typeorm';

import ServiceEntity from '../entity/service';
import ThemeEntity from '../entity/theme';
import UserEntity from '../entity/user';
import { InsertableServiceInfo, ServiceBasicInfo } from '../types/service';
import { uuidv4 } from '../utils/service';

@EntityRepository(ServiceEntity)
class ServiceRepository extends Repository<ServiceEntity> {
  async findByServiceId(id: number): Promise<ServiceEntity | undefined> {
    const service = await this.createQueryBuilder('service')
      .where('service.id = :id', { id })
      .leftJoinAndSelect('service.theme', 'theme')
      .leftJoin('service.user', 'user')
      .addSelect(['user.uid'])
      .getOne();
    return service;
  }

  async findAndCountByUserId(userId: string): Promise<[ServiceEntity[], number]> {
    const serviceListAndCount = await this.findAndCount({
      select: ['id', 'name', 'domain', 'clientId'],
      where: { user: userId },
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

  async editService(serviceId: number, updateData: InsertableServiceInfo): Promise<void> {
    await this.update({ id: serviceId }, updateData);
  }

  async deleteService(service: ServiceEntity): Promise<void> {
    await this.remove(service);
  }
}

export default ServiceRepository;
