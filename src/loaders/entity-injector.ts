import { ObjectLiteral } from 'typeorm';
import dependencyInjector, { DependencyInfo } from './dependency-injector';

import UserEntity from '../entity/user';

const entityInjector = () => {
  const entities: DependencyInfo<ObjectLiteral>[] = [
    { name: 'userEntity', dependency: new UserEntity() },
  ];

  dependencyInjector<ObjectLiteral>(entities);
};

export default entityInjector;
