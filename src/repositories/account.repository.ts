import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ServicefinderDataSource} from '../datasources';
import {Account, AccountRelations} from '../models';

export class AccountRepository extends DefaultCrudRepository<
  Account,
  typeof Account.prototype.id,
  AccountRelations
> {
  constructor(
    @inject('datasources.servicefinder') dataSource: ServicefinderDataSource,
  ) {
    super(Account, dataSource);
  }

  definePersistedModel(entityClass: typeof Account) {
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
