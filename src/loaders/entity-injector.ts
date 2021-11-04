import { ObjectLiteral } from 'typeorm';

import UserEntity from '../entity/user';
import dependencyInjector, { DependencyInfo } from './dependency-injector';

const entityInjector = (): void => {
  const entities: DependencyInfo<ObjectLiteral>[] = [
    { name: 'userEntity', dependency: new UserEntity() },
  ];

  dependencyInjector<ObjectLiteral>(entities);
};

export default entityInjector;
