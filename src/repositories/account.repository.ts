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
      if (ctx.isNewInstance) {
        ctx.instance.createdAt = new Date();
        ctx.instance.updatedAt = new Date();
      } else if (ctx.data) {
        ctx.data.updatedAt = new Date();
      } else {
        console.log('ctx.data is missing');
      }
    });
    return modelClass;
  }
}
