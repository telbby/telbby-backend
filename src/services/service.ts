import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { commonError, themeError } from '../constants/error';
import ServiceEntity from '../entity/service';

import ServiceRepository from '../repositories/service';
import ThemeRepository from '../repositories/theme';
import UserRepository from '../repositories/user';
import { UpdateInfo } from '../types';
import { EditableServiceInfo, InsertableServiceInfo, ServiceBasicInfo } from '../types/service';
import ErrorResponse from '../utils/error-response';
import { uploadFileOnCloudinary } from '../utils/service';

@Service()
class ServiceService {
  private serviceRepository: ServiceRepository;

  private userRepository: UserRepository;

  private themeRepository: ThemeRepository;

  constructor(
    @InjectRepository(ServiceRepository) serviceRepository: ServiceRepository,
    @InjectRepository(UserRepository) userRepository: UserRepository,
    @InjectRepository(ThemeRepository) themeRepository: ThemeRepository,
  ) {
    this.serviceRepository = serviceRepository;
    this.userRepository = userRepository;
    this.themeRepository = themeRepository;
  }

  async getService(uid: string, id: number): Promise<ServiceEntity> {
    const service = await this.serviceRepository.findByServiceId(id);

    if (!service) {
      throw new ErrorResponse(commonError.notFound);
    }

    if (service.user.uid !== uid) {
      throw new ErrorResponse(commonError.forbidden);
    }

    return service;
  }

  async getAllServiceAndCountOfUser(
    uid: string,
  ): Promise<{ serviceList: ServiceEntity[]; count: number }> {
    const [serviceList, count] = await this.serviceRepository.findAndCountByUserId(uid);
    return { serviceList, count };
  }

  async createService(
    uid: string,
    serviceInfo: ServiceBasicInfo,
  ): Promise<{ id: number } & UpdateInfo> {
    const theme = await this.themeRepository.findById(1);
    const user = await this.userRepository.findByUid(uid);

    if (!theme) {
      throw new ErrorResponse(themeError.needDefaultTheme);
    }

    if (!user) {
      throw new ErrorResponse(commonError.unauthorized);
    }

    const service = await this.serviceRepository.createService(serviceInfo, theme, user);

    const { id, createdAt, updatedAt } = service;
    return { id, createdAt, updatedAt };
  }

  async editService(
    uid: string,
    serviceId: number,
    serviceInfo: EditableServiceInfo,
  ): Promise<void> {
    const service = await this.serviceRepository.findByServiceId(serviceId);
    const { themeId, image, ...rest } = serviceInfo;

    const updateData: InsertableServiceInfo = rest;

    if (!service) {
      throw new ErrorResponse(commonError.notFound);
    }

    if (uid !== service.user.uid) {
      throw new ErrorResponse(commonError.forbidden);
    }

    if (themeId) {
      const theme = await this.themeRepository.findById(themeId);
      if (!theme) throw new ErrorResponse(themeError.needDefaultTheme);

      updateData.theme = theme;
    }

    if (Object.keys(image).length) {
      const url = await uploadFileOnCloudinary(image);

      updateData.image = url;
    }

    await this.serviceRepository.editService(service, updateData);
  }

  async deleteService(uid: string, serviceId: number): Promise<void> {
    const service = await this.serviceRepository.findByServiceId(serviceId);

    if (!service) {
      throw new ErrorResponse(commonError.notFound);
    }

    if (uid !== service.user.uid) {
      throw new ErrorResponse(commonError.forbidden);
    }

    await this.serviceRepository.deleteService(service);
  }
}

export default ServiceService;
