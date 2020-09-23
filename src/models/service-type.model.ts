import {Entity, model, property} from '@loopback/repository';

@model()
export class ServiceType extends Entity {
  @property({
    id: true,
    type: 'string',
    required: false,
    defaultFn: 'uuid',
    generated: false,
    useDefaultIdType: false,
    postgresql: {
      dataType: 'uuid',
    },
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  serviceId: string;

  @property({
    type: 'string',
  })
  description?: string;

  constructor(data?: Partial<ServiceType>) {
    super(data);
  }
}

export interface ServiceTypeRelations {
  // describe navigational properties here
}

export type ServiceTypeWithRelations = ServiceType & ServiceTypeRelations;
