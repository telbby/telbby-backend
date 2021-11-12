import { EntityRepository, Repository } from 'typeorm';

import ServiceEntity from '../entity/service';

@EntityRepository(ServiceEntity)
class ServiceRepository extends Repository<ServiceEntity> {
  async findByServiceId(id: number): Promise<ServiceEntity | undefined> {
    const service = await this.findOne({ where: { id } });
    return service;
  }
}

export default ServiceRepository;
