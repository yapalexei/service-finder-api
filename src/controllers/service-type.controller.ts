import {authenticate} from '@loopback/authentication';
import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, put, requestBody} from '@loopback/rest';
import {ServiceType} from '../models';
import {ServiceTypeRepository} from '../repositories';

export class ServiceTypeController {
  constructor(
    @repository(ServiceTypeRepository)
    public serviceTypeRepository : ServiceTypeRepository,
  ) {}

  @post('/service-types', {
    responses: {
      '200': {
        description: 'ServiceType model instance',
        content: {'application/json': {schema: getModelSchemaRef(ServiceType)}},
      },
    },
  })
  @authenticate('jwt')
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServiceType, {
            title: 'NewServiceType',
            exclude: ['id'],
          }),
        },
      },
    })
    serviceType: Omit<ServiceType, 'id'>,
  ): Promise<ServiceType> {
    return this.serviceTypeRepository.create(serviceType);
  }

  @get('/service-types/count', {
    responses: {
      '200': {
        description: 'ServiceType model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  async count(
    @param.where(ServiceType) where?: Where<ServiceType>,
  ): Promise<Count> {
    return this.serviceTypeRepository.count(where);
  }

  @get('/service-types', {
    responses: {
      '200': {
        description: 'Array of ServiceType model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(ServiceType, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async find(
    @param.filter(ServiceType) filter?: Filter<ServiceType>,
  ): Promise<ServiceType[]> {
    return this.serviceTypeRepository.find(filter);
  }

  // @patch('/service-types', {
  //   responses: {
  //     '200': {
  //       description: 'ServiceType PATCH success count',
  //       content: {'application/json': {schema: CountSchema}},
  //     },
  //   },
  // })
  // async updateAll(
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(ServiceType, {partial: true}),
  //       },
  //     },
  //   })
  //   serviceType: ServiceType,
  //   @param.where(ServiceType) where?: Where<ServiceType>,
  // ): Promise<Count> {
  //   return this.serviceTypeRepository.updateAll(serviceType, where);
  // }

  @get('/service-types/{id}', {
    responses: {
      '200': {
        description: 'ServiceType model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ServiceType, {includeRelations: true}),
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ServiceType, {exclude: 'where'}) filter?: FilterExcludingWhere<ServiceType>
  ): Promise<ServiceType> {
    return this.serviceTypeRepository.findById(id, filter);
  }

  @patch('/service-types/{id}', {
    responses: {
      '204': {
        description: 'ServiceType PATCH success',
      },
    },
  })
  @authenticate('jwt')
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServiceType, {partial: true}),
        },
      },
    })
    serviceType: ServiceType,
  ): Promise<void> {
    await this.serviceTypeRepository.updateById(id, serviceType);
  }

  /**
   * NOTE: the PUT method originally used replaceById. The change was made due
   * to constraints made on `createdAt` and `updatedAt` properties. Both are not
   * settable directly, they are auto set/generated. So, when PUT is used without
   * those props they would be set to null and the DB will throw an exception.
   * @param id domain object id
   * @param serviceType the object that describes the serviceType
   */
  @put('/service-types/{id}', {
    responses: {
      '204': {
        description: 'ServiceType PUT success',
      },
    },
  })
  @authenticate('jwt')
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() serviceType: ServiceType,
  ): Promise<void> {
    await this.serviceTypeRepository.updateById(id, serviceType);
  }

  @del('/service-types/{id}', {
    responses: {
      '204': {
        description: 'ServiceType DELETE success',
      },
    },
  })
  @authenticate('jwt')
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.serviceTypeRepository.deleteById(id);
  }
}
