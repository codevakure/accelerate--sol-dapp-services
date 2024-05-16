import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true}})
export class Cors extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  selectedName?: string;

  @property({
    type: 'array',
    itemType: Object,
  })
  selectedNames?: {}[];

  @property({
    type: 'string',
  })
  contractNo?: string;

  @property({
    type: 'string',
  })
  signature?: string;

  @property({
    type: 'string',
  })
  Acknowledgement?: string;

  @property({
    type: 'string',
  })
  Name?: string;

  @property({
    type: 'string',
  })
  Title?: string;

  @property({
    type: 'object',
  })
  date?: Object;

  // @property({
  //   type: 'string',
  // })
  // notify?: string;

  @property({
    type: 'string',
  })
  CORSIG?: string;

  @property({
    type: 'string',
  })
  data?: string;

  @property({
    type: 'string',
  })
  description?: string;




  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Cors>) {
    super(data);
  }
}

export interface CorsRelations {
  // describe navigational properties here
}

export type CorsWithRelations = Cors & CorsRelations;
