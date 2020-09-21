import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, HasOneRepositoryFactory, repository, BelongsToAccessor} from '@loopback/repository';
import {ServicefinderDataSource} from '../datasources';
import {User, UserRelations, UserCredentials} from '../models';
import {UserCredentialsRepository} from '.';

export type Credentials = {
  email: string;
  password: string;
  role?: string
};

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly userCredentials: HasOneRepositoryFactory<UserCredentials, typeof User.prototype.id>;
  public readonly owner: BelongsToAccessor<User, typeof User.prototype.id>;

  constructor(
    @inject('datasources.servicefinder') dataSource: ServicefinderDataSource,
    @repository.getter('UserCredentialsRepository')
    protected userCredentialsRepositoryGetter: Getter<UserCredentialsRepository>,
  ) {
    super(User, dataSource);
    this.userCredentials = this.createHasOneRepositoryFactoryFor('userCredentials', userCredentialsRepositoryGetter);
    this.registerInclusionResolver('userCredentials', this.userCredentials.inclusionResolver);
  }

  definePersistedModel(entityClass: typeof User) {
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

  async findCredentials(
    userId: typeof User.prototype.id,
  ): Promise<UserCredentials | undefined> {
    try {
      return await this.userCredentials(userId).get();
    } catch (err) {
      if (err.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      throw err;
    }
  }
}

