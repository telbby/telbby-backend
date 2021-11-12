import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { commonError } from '../constants/error';
import ServiceEntity from '../entity/service';

import ServiceRepository from '../repositories/service';
import ErrorResponse from '../utils/error-response';

@Service()
class ServiceService {
  private serviceRepository: ServiceRepository;

  constructor(@InjectRepository(ServiceRepository) serviceRepository: ServiceRepository) {
    this.serviceRepository = serviceRepository;
  }

  async getService(id: number): Promise<ServiceEntity> {
    const service = await this.serviceRepository.findByServiceId(id);
    if (!service) {
      throw new ErrorResponse(commonError.badRequest);
    }
    return service;
  }
}

export default ServiceService;
