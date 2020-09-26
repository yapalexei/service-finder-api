import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Membership,
  User,
} from '../models';
import {MembershipRepository} from '../repositories';

export class MembershipUserController {
  constructor(
    @repository(MembershipRepository)
    public membershipRepository: MembershipRepository,
  ) { }

  @get('/memberships/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Membership',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof Membership.prototype.id,
  ): Promise<User> {
    return this.membershipRepository.user(id);
  }
}
