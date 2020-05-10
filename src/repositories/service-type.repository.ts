import {DefaultCrudRepository} from '@loopback/repository';
import {ServiceType, ServiceTypeRelations} from '../models';
import {ServicefinderDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ServiceTypeRepository extends DefaultCrudRepository<
  ServiceType,
  typeof ServiceType.prototype.id,
  ServiceTypeRelations
> {
  constructor(
    @inject('datasources.servicefinder') dataSource: ServicefinderDataSource,
  ) {
    super(ServiceType, dataSource);
  }
}
