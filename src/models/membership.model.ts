import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Account, AccountRelations} from './account.model';
import {UserRelations} from './user.model';

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

  @property({
    type: 'array',
    required: true,
    itemType: 'string',
    jsonSchema: {
      uniqueItems: true,
      items: [{
        type: 'string',
        enum: ['read', 'write'],
      }],
      additionalItems: {
        type: 'string',
        enum: ['read', 'write'],
      }
    }
  })
  permissions: string[];

  @property({
    type: 'string',
  })
  userId: string;

  @belongsTo(() => Account)
  accountId: string;

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
  user?: UserRelations,
  account?: AccountRelations
}

export type MembershipWithRelations = Membership & MembershipRelations;
