import {Entity, model, property, belongsTo} from '@loopback/repository';
import {User} from './user.model';
import {Account} from './account.model';

@model()
export class Membership extends Entity {
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
  id: string;

  @property.array(String, {
    required: true,
    jsonSchema: {
      enum: ['read', 'write'],
    }
  })
  permissions: string[];

  @belongsTo(() => Account)
  accountId: string;

  @belongsTo(() => User)
  userId: string;

  @property({
    type: 'Date',
    postgresql: {
      dataType: "timestamp without time zone",
    },
    required: false,
  })
  createdAt: Date;

  @property({
    type: 'Date',
    postgresql: {
      dataType: "timestamp without time zone",
    },
    required: false,
  })
  updatedAt: Date;

  constructor(data?: Partial<Membership>) {
    super(data);
  }
}

export interface MembershipRelations {
  // describe navigational properties here
}

export type MembershipWithRelations = Membership & MembershipRelations;
