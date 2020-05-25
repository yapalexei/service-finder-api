import {Entity, hasMany, model, property} from '@loopback/repository';
import {Membership} from './membership.model';
import {Service} from './service.model';

@model()
export class Account extends Entity {
  @property({
    id: true,
    type: 'string',
    required: false,
    defaultFn: 'uuid',
    generated: true,
    useDefaultIdType: false,
    postgresql: {
      dataType: 'uuid',
    },
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
    default: "Org name",
  })
  name: string;

  @property({
    type: 'string',
  })
  description?: string;

  @hasMany(() => Membership)
  members?: Membership[];

  @hasMany(() => Service)
  services?: Service[];

  constructor(data?: Partial<Account>) {
    super(data);
  }

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
}

export interface AccountRelations {
  // describe navigational properties here
}

export type AccountWithRelations = Account & AccountRelations;
