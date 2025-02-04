import {authenticate} from '@loopback/authentication';
import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, put, requestBody} from '@loopback/rest';
import {Service} from '../models';
import {ServiceRepository} from '../repositories';

export class ServiceController {
  constructor(
    @repository(ServiceRepository)
    public serviceRepository : ServiceRepository,
  ) {}

  @post('/services', {
    responses: {
      '200': {
        description: 'Service model instance',
        content: {'application/json': {schema: getModelSchemaRef(Service)}},
      },
    },
  })
  @authenticate('jwt')
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Service, {
            title: 'NewService',
            exclude: ['id', 'createdAt', 'updatedAt'],
          }),
        },
      },
    })
    service: Omit<Service, 'id'>,
  ): Promise<Service> {
    return this.serviceRepository.create(service);
  }

  @get('/services/count', {
    responses: {
      '200': {
        description: 'Service model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  async count(
    @param.where(Service) where?: Where<Service>,
  ): Promise<Count> {
    return this.serviceRepository.count(where);
  }

  @get('/services', {
    responses: {
      '200': {
        description: 'Array of Service model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Service, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async find(
    @param.filter(Service) filter?: Filter<Service>,
  ): Promise<Service[]> {
    return this.serviceRepository.find(filter);
  }

  // @patch('/services', {
  //   responses: {
  //     '200': {
  //       description: 'Service PATCH success count',
  //       content: {'application/json': {schema: CountSchema}},
  //     },
  //   },
  // })
  // async updateAll(
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Service, {partial: true}),
  //       },
  //     },
  //   })
  //   service: Service,
  //   @param.where(Service) where?: Where<Service>,
  // ): Promise<Count> {
  //   return this.serviceRepository.updateAll(service, where);
  // }

  @get('/services/{id}', {
    responses: {
      '200': {
        description: 'Service model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Service, {includeRelations: true}),
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Service, {exclude: 'where'}) filter?: FilterExcludingWhere<Service>
  ): Promise<Service> {
    return this.serviceRepository.findById(id, filter);
  }

  @patch('/services/{id}', {
    responses: {
      '204': {
        description: 'Service PATCH success',
      },
    },
  })
  @authenticate('jwt')
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Service, {
            partial: true,
            exclude: ['id', 'createdAt', 'updatedAt'],
          }),
        },
      },
    })
    service: Service,
  ): Promise<void> {
    await this.serviceRepository.updateById(id, service);
  }

  /**
   * NOTE: the PUT method originally used replaceById. The change was made due
   * to constraints made on `createdAt` and `updatedAt` properties. Both are not
   * settable directly, they are auto set/generated. So, when PUT is used without
   * those props they would be set to null and the DB will throw an exception.
   * @param id domain object id
   * @param service the object that describes the service
   */
  @put('/services/{id}', {
    responses: {
      '204': {
        description: 'Service PUT success',
      },
    },
  })
  @authenticate('jwt')
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Service, {
            exclude: ['id', 'createdAt', 'updatedAt'],
          }),
        },
      },
    }) service: Service,
  ): Promise<void> {
    await this.serviceRepository.updateById(id, service);
  }

  @del('/services/{id}', {
    responses: {
      '204': {
        description: 'Service DELETE success',
      },
    },
  })
  @authenticate('jwt')
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.serviceRepository.deleteById(id);
  }
}
