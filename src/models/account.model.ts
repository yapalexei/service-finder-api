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
    type: 'date',
    generated: true,
    defaultFn: 'now',
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
}

export interface AccountRelations {
  // describe navigational properties here
}

export type AccountWithRelations = Account & AccountRelations;
