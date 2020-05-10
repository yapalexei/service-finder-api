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
  async find(
    @param.filter(ServiceType) filter?: Filter<ServiceType>,
  ): Promise<ServiceType[]> {
    return this.serviceTypeRepository.find(filter);
  }

  @patch('/service-types', {
    responses: {
      '200': {
        description: 'ServiceType PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServiceType, {partial: true}),
        },
      },
    })
    serviceType: ServiceType,
    @param.where(ServiceType) where?: Where<ServiceType>,
  ): Promise<Count> {
    return this.serviceTypeRepository.updateAll(serviceType, where);
  }

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

  @put('/service-types/{id}', {
    responses: {
      '204': {
        description: 'ServiceType PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() serviceType: ServiceType,
  ): Promise<void> {
    await this.serviceTypeRepository.replaceById(id, serviceType);
  }

  @del('/service-types/{id}', {
    responses: {
      '204': {
        description: 'ServiceType DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.serviceTypeRepository.deleteById(id);
  }
}
