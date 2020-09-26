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
  Service,
} from '../models';
import {AccountRepository} from '../repositories';

export class AccountServiceController {
  constructor(
    @repository(AccountRepository) protected accountRepository: AccountRepository,
  ) { }

  @get('/accounts/{id}/services', {
    responses: {
      '200': {
        description: 'Array of Account has many Service',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Service)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Service>,
  ): Promise<Service[]> {
    return this.accountRepository.services(id).find(filter);
  }

  @post('/accounts/{id}/services', {
    responses: {
      '200': {
        description: 'Account model instance',
        content: {'application/json': {schema: getModelSchemaRef(Service)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Account.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Service, {
            title: 'NewServiceInAccount',
            exclude: ['id'],
            optional: ['accountId']
          }),
        },
      },
    }) service: Omit<Service, 'id'>,
  ): Promise<Service> {
    return this.accountRepository.services(id).create(service);
  }

  @patch('/accounts/{id}/services', {
    responses: {
      '200': {
        description: 'Account.Service PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Service, {partial: true}),
        },
      },
    })
    service: Partial<Service>,
    @param.query.object('where', getWhereSchemaFor(Service)) where?: Where<Service>,
  ): Promise<Count> {
    return this.accountRepository.services(id).patch(service, where);
  }

  @del('/accounts/{id}/services', {
    responses: {
      '200': {
        description: 'Account.Service DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Service)) where?: Where<Service>,
  ): Promise<Count> {
    return this.accountRepository.services(id).delete(where);
  }
}
