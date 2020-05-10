import {Entity, hasOne, model, property} from '@loopback/repository';
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

  @hasOne(() => ServiceType)
  serviceType?: ServiceType;

  @hasOne(() => Account)
  owner?: Account;

  @property({
    type: 'date',
    generated: true,
    postgresql: {
      dataType: "timestamp with time zone",
      nullable: "NO"
    }
  })
  createdAt: string;

  @property({
    type: 'date',
    generated: true,
    defaultFn: 'now',
    postgresql: {
      dataType: "timestamp with time zone",
      nullable: "YES"
    }
  })
  updatedAt: string;

  constructor(data?: Partial<Service>) {
    super(data);
  }
}

export interface ServiceRelations {
  // describe navigational properties here
}

export type ServiceWithRelations = Service & ServiceRelations;
