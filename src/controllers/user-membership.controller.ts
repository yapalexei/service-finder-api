import {authenticate} from '@loopback/authentication';
import {
  // Count,
  // CountSchema,
  Filter,
  repository,
  // Where,
} from '@loopback/repository';
import {
  // del,
  get,
  getModelSchemaRef,
  // getWhereSchemaFor,
  param,
  // patch,
  // post,
  // requestBody,
} from '@loopback/rest';
import {
  // User,
  Membership,
} from '../models';
import {UserRepository} from '../repositories';

export class UserMembershipController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/memberships', {
    responses: {
      '200': {
        description: 'Array of User has many Membership',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Membership)},
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Membership>,
  ): Promise<Membership[]> {
    return this.userRepository.memberships(id).find(filter);
  }

  // @post('/users/{id}/memberships', {
  //   responses: {
  //     '200': {
  //       description: 'User model instance',
  //       content: {'application/json': {schema: getModelSchemaRef(Membership)}},
  //     },
  //   },
  // })
  // async create(
  //   @param.path.string('id') id: typeof User.prototype.id,
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Membership, {
  //           title: 'NewMembershipInUser',
  //           exclude: ['id'],
  //           optional: ['userId']
  //         }),
  //       },
  //     },
  //   }) membership: Omit<Membership, 'id'>,
  // ): Promise<Membership> {
  //   return this.userRepository.memberships(id).create(membership);
  // }

  // @patch('/users/{id}/memberships', {
  //   responses: {
  //     '200': {
  //       description: 'User.Membership PATCH success count',
  //       content: {'application/json': {schema: CountSchema}},
  //     },
  //   },
  // })
  // async patch(
  //   @param.path.string('id') id: string,
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Membership, {partial: true}),
  //       },
  //     },
  //   })
  //   membership: Partial<Membership>,
  //   @param.query.object('where', getWhereSchemaFor(Membership)) where?: Where<Membership>,
  // ): Promise<Count> {
  //   return this.userRepository.memberships(id).patch(membership, where);
  // }

  // @del('/users/{id}/memberships', {
  //   responses: {
  //     '200': {
  //       description: 'User.Membership DELETE success count',
  //       content: {'application/json': {schema: CountSchema}},
  //     },
  //   },
  // })
  // async delete(
  //   @param.path.string('id') id: string,
  //   @param.query.object('where', getWhereSchemaFor(Membership)) where?: Where<Membership>,
  // ): Promise<Count> {
  //   return this.userRepository.memberships(id).delete(where);
  // }
}
