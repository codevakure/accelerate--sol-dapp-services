import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true}})
export class ContractAdmin extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;


  @property({
    type: 'string',
  })
  description?: string;

  @property.array(Object, {
    name: 'clause',
    required: false
  })
  clause: any[];

  constructor(data?: Partial<ContractAdmin>) {
    super(data);
  }
}

export interface ContractAdminRelations {
  // describe navigational properties here
}

export type ContractAdminWithRelations = ContractAdmin & ContractAdminRelations;
