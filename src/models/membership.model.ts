import {Entity, hasOne, model, property} from '@loopback/repository';
import {User} from './user.model';

@model()
export class Membership extends Entity {
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
  id: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  permissions?: string[];

  @hasOne(() => User)
  user: User;

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

  constructor(data?: Partial<Membership>) {
    super(data);
  }
}

export interface MembershipRelations {
  // describe navigational properties here
}

export type MembershipWithRelations = Membership & MembershipRelations;
