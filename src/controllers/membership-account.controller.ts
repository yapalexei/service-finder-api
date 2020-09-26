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
  Account,
} from '../models';
import {MembershipRepository} from '../repositories';

export class MembershipAccountController {
  constructor(
    @repository(MembershipRepository)
    public membershipRepository: MembershipRepository,
  ) { }

  @get('/memberships/{id}/account', {
    responses: {
      '200': {
        description: 'Account belonging to Membership',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Account)},
          },
        },
      },
    },
  })
  async getAccount(
    @param.path.string('id') id: typeof Membership.prototype.id,
  ): Promise<Account> {
    return this.membershipRepository.account(id);
  }
}
