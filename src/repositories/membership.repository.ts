import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Membership, MembershipRelations, User, Account} from '../models';
import {ServicefinderDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';
import {AccountRepository} from './account.repository';

export class MembershipRepository extends DefaultCrudRepository<
  Membership,
  typeof Membership.prototype.id,
  MembershipRelations
> {

  public readonly user: BelongsToAccessor<User, typeof Membership.prototype.id>;

  public readonly account: BelongsToAccessor<Account, typeof Membership.prototype.id>;

  constructor(
    @inject('datasources.servicefinder') dataSource: ServicefinderDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('AccountRepository') protected accountRepositoryGetter: Getter<AccountRepository>,
  ) {
    super(Membership, dataSource);
    this.account = this.createBelongsToAccessorFor('account', accountRepositoryGetter,);
    this.registerInclusionResolver('account', this.account.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
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
