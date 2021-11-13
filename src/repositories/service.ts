import { EntityRepository, Repository } from 'typeorm';

import ServiceEntity from '../entity/service';

@EntityRepository(ServiceEntity)
class ServiceRepository extends Repository<ServiceEntity> {
  async findByServiceId(id: number): Promise<ServiceEntity | undefined> {
    const service = await this.findOne({ where: { id } });
    return service;
  }

  async findByUserId(userId: string): Promise<[ServiceEntity[], number]> {
    const serviceListAndCount = await this.findAndCount({ where: { user: userId } });
    return serviceListAndCount;
  }
}

export default ServiceRepository;
