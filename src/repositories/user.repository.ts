import {Constructor, inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ServicefinderDataSource} from '../datasources';
import {User, UserRelations} from '../models';
import {TimeStampRepositoryMixin} from './mixins/TimeStampMixin';

export class UserRepository extends TimeStampRepositoryMixin<
  User,
  typeof User.prototype.id,
  Constructor<
    DefaultCrudRepository<User, typeof User.prototype.id, UserRelations>
  >
>(DefaultCrudRepository) {
  constructor(
    @inject('datasources.servicefinder') dataSource: ServicefinderDataSource,
  ) {
    super(User, dataSource);
  }

  // definePersistedModel(entityClass: typeof User) {
  //   const modelClass = super.definePersistedModel(entityClass);
  //   modelClass.observe('before save', async (ctx) => {
  //     if (ctx.isNewInstance) {
  //       ctx.instance.createdAt = new Date();
  //       ctx.instance.updatedAt = new Date();
  //     } else if (ctx.data) {
  //       ctx.data.updatedAt = new Date();
  //     } else {
  //       console.log('ctx.data is missing');
  //     }
  //   });
  //   return modelClass;
  // }
}

