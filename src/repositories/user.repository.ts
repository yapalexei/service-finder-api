import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ServicefinderDataSource} from '../datasources';
import {User, UserRelations} from '../models';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
  > {
  constructor(
    @inject('datasources.servicefinder') dataSource: ServicefinderDataSource,
  ) {
    super(User, dataSource);
  }

  definePersistedModel(entityClass: typeof User) {
    const modelClass = super.definePersistedModel(entityClass);
    modelClass.observe('before save', async (ctx) => {
      const now = new Date();
      if (ctx.isNewInstance) {
        ctx.instance.createdAt = now;
        ctx.instance.updatedAt = now;
      }
      else {
        ctx.data.updatedAt = new Date();
      }
    });
    return modelClass;
  }
}

