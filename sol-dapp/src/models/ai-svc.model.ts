import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: true}})
export class AiSvc extends Model {
  @property({
    type: 'string',
  })
  contract_type?: string;

  @property({
    type: 'string',
  })
  contract_purpose?: string;

  
  @property({
    type: 'string',
  })
  categories?: string;

  @property({
    type: 'string',
  })
  contracting_method?: string;

  @property({
    type: 'number',
  })
  dollar_amount?: number;

  @property({
    type: 'string',
  })
  key_words?: string;

  @property({
    type: 'boolean',
  })
  is_commercial?: boolean;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<AiSvc>) {
    super(data);
  }
}

export interface AiSvcRelations {
  // describe navigational properties here
}

export type AiSvcWithRelations = AiSvc & AiSvcRelations;
