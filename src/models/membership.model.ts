import {Entity, hasOne, model, property} from '@loopback/repository';
import {User} from './user.model';

@model()
export class Membership extends Entity {
  @property({
    type: 'string',
    required: true,
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

  constructor(data?: Partial<Membership>) {
    super(data);
  }
}

export interface MembershipRelations {
  // describe navigational properties here
}

export type MembershipWithRelations = Membership & MembershipRelations;
