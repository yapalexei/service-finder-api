import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ServicefinderDataSource} from '../datasources';
import {Account, AccountRelations, Membership, Service} from '../models';
import {MembershipRepository} from './membership.repository';
import {ServiceRepository} from './service.repository';

export class AccountRepository extends DefaultCrudRepository<
  Account,
  typeof Account.prototype.id,
  AccountRelations
> {

  public readonly memberships: HasManyRepositoryFactory<Membership, typeof Account.prototype.id>;

  public readonly services: HasManyRepositoryFactory<Service, typeof Account.prototype.id>;

  constructor(
    @inject('datasources.servicefinder') dataSource: ServicefinderDataSource, @repository.getter('MembershipRepository') protected membershipRepositoryGetter: Getter<MembershipRepository>, @repository.getter('ServiceRepository') protected serviceRepositoryGetter: Getter<ServiceRepository>,
  ) {
    super(Account, dataSource);
    this.services = this.createHasManyRepositoryFactoryFor('services', serviceRepositoryGetter,);
    this.registerInclusionResolver('services', this.services.inclusionResolver);
    this.memberships = this.createHasManyRepositoryFactoryFor('memberships', membershipRepositoryGetter,);
    this.registerInclusionResolver('memberships', this.memberships.inclusionResolver);
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
