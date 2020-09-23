import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {basicAuthorization} from '../middlewares/authentication.voter';
import {Membership} from '../models';
import {MembershipRepository} from '../repositories';

export class MembershipController {
  constructor(
    @repository(MembershipRepository)
    public membershipRepository : MembershipRepository,
  ) {}

  @post('/memberships', {
    responses: {
      '200': {
        description: 'Membership model instance',
        content: {'application/json': {schema: getModelSchemaRef(Membership)}},
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Membership, {
            title: 'NewMembership',
            exclude: ['id', 'createdAt', 'updatedAt'],
          }),
        },
      },
    })
    membership: Omit<Membership, 'id'>,
  ): Promise<Membership> {
    return this.membershipRepository.create(membership);
  }

  @get('/memberships/count', {
    responses: {
      '200': {
        description: 'Membership model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async count(
    @param.where(Membership) where?: Where<Membership>,
  ): Promise<Count> {
    return this.membershipRepository.count(where);
  }

  @get('/memberships', {
    responses: {
      '200': {
        description: 'Array of Membership model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Membership, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async find(
    @param.filter(Membership) filter?: Filter<Membership>,
  ): Promise<Membership[]> {
    return this.membershipRepository.find(filter);
  }

  // @patch('/memberships', {
  //   responses: {
  //     '200': {
  //       description: 'Membership PATCH success count',
  //       content: {'application/json': {schema: CountSchema}},
  //     },
  //   },
  // })
  // async updateAll(
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Membership, {partial: true}),
  //       },
  //     },
  //   })
  //   membership: Membership,
  //   @param.where(Membership) where?: Where<Membership>,
  // ): Promise<Count> {
  //   return this.membershipRepository.updateAll(membership, where);
  // }

  @get('/memberships/{id}', {
    responses: {
      '200': {
        description: 'Membership model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Membership, {includeRelations: true}),
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Membership, {exclude: 'where'}) filter?: FilterExcludingWhere<Membership>
  ): Promise<Membership> {
    return this.membershipRepository.findById(id, filter);
  }

  @patch('/memberships/{id}', {
    responses: {
      '204': {
        description: 'Membership PATCH success',
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Membership, {
            partial: true,
            exclude: ['id', 'createdAt', 'updatedAt'],
          }),
        },
      },
    })
    membership: Membership,
  ): Promise<void> {
    await this.membershipRepository.updateById(id, membership);
  }

  @put('/memberships/{id}', {
    responses: {
      '204': {
        description: 'Membership PUT success',
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Membership, {
            partial: true,
            exclude: ['id', 'createdAt', 'updatedAt'],
          }),
        },
      },
    }) membership: Membership,
  ): Promise<void> {
    await this.membershipRepository.replaceById(id, membership);
  }

  @del('/memberships/{id}', {
    responses: {
      '204': {
        description: 'Membership DELETE success',
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.membershipRepository.deleteById(id);
  }
}
