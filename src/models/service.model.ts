import {belongsTo, Entity, hasOne, model, property} from '@loopback/repository';
import {Account} from './account.model';
import {ServiceType} from './service-type.model';

@model()
export class Service extends Entity {
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
  })
  description?: string;

  @hasOne(() => ServiceType, { keyTo: 'serviceId' })
  serviceTypeId?: string;

  @belongsTo(() => Account, { keyTo: 'id' })
  accountId?: string;

  @property({
    type: 'Date',
    postgresql: {
      dataType: "timestamp without time zone",
    }
  })
  createdAt: Date;

  @property({
    type: 'Date',
    postgresql: {
      dataType: "timestamp without time zone",
    }
  })
  updatedAt: Date;

  constructor(data?: Partial<Service>) {
    super(data);
  }
}

export interface ServiceRelations {
  // describe navigational properties here
}

export type ServiceWithRelations = Service & ServiceRelations;
