import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: 'filter'}})
export class User extends Entity {
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
  firstName: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  @property({
    type: 'string',
  })
  avatarUri?: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      format: 'email',
      minLength: 5,
      maxLength: 50,
      transform: ['toLowerCase'],
    }
  })
  email: string;

  @property({
    type: 'number',
    required: true,
  })
  birthday: number;

  @property({
    type: 'date',
    generated: true,
  //   defaultFn: 'now',
    postgresql: {
      dataType: "timestamp with time zone",
      nullable: "NO"
    }
  })
  createdAt: Date;

  @property({
    type: 'date',
    generated: true,
  //   postgresql: {
  //     dataType: "timestamp with time zone",
  //     nullable: "NO"
  //   }
  })
  updatedAt: Date;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
