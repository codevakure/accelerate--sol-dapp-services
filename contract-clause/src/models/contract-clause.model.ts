import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true}})
export class ContractClause extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;


  @property.array(Object, {
    name: 'clause',
    required: false
  })
  clause: any[];

  @property({
    type: 'string',
  })
  description?: string;
  
  constructor(data?: Partial<ContractClause>) {
    super(data);
  }
}

export interface ContractClauseRelations {
  // describe navigational properties here
}

export type ContractClauseWithRelations = ContractClause & ContractClauseRelations;
