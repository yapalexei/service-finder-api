import {DefaultCrudRepository, HasOneRepositoryFactory} from '@loopback/repository';
import {Membership, MembershipRelations, User} from '../models';
import {ServicefinderDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class MembershipRepository extends DefaultCrudRepository<
  Membership,
  typeof Membership.prototype.id,
  MembershipRelations
> {
  public readonly user: HasOneRepositoryFactory<User, typeof Membership.prototype.id>;

  constructor(
    @inject('datasources.servicefinder') dataSource: ServicefinderDataSource,
  ) {
    super(Membership, dataSource);
  }

  definePersistedModel(entityClass: typeof Membership) {
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
