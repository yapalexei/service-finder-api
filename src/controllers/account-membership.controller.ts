import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Account,
  Membership,
} from '../models';
import {AccountRepository} from '../repositories';

export class AccountMembershipController {
  constructor(
    @repository(AccountRepository) protected accountRepository: AccountRepository,
  ) { }

  @get('/accounts/{id}/memberships', {
    responses: {
      '200': {
        description: 'Array of Account has many Membership',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Membership)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Membership>,
  ): Promise<Membership[]> {
    return this.accountRepository.memberships(id).find(filter);
  }

  @post('/accounts/{id}/memberships', {
    responses: {
      '200': {
        description: 'Account model instance',
        content: {'application/json': {schema: getModelSchemaRef(Membership)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Account.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Membership, {
            title: 'NewMembershipInAccount',
            exclude: ['id'],
            optional: ['accountId']
          }),
        },
      },
    }) membership: Omit<Membership, 'id'>,
  ): Promise<Membership> {
    return this.accountRepository.memberships(id).create(membership);
  }

  @patch('/accounts/{id}/memberships', {
    responses: {
      '200': {
        description: 'Account.Membership PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Membership, {partial: true}),
        },
      },
    })
    membership: Partial<Membership>,
    @param.query.object('where', getWhereSchemaFor(Membership)) where?: Where<Membership>,
  ): Promise<Count> {
    return this.accountRepository.memberships(id).patch(membership, where);
  }

  @del('/accounts/{id}/memberships', {
    responses: {
      '200': {
        description: 'Account.Membership DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Membership)) where?: Where<Membership>,
  ): Promise<Count> {
    return this.accountRepository.memberships(id).delete(where);
  }
}
