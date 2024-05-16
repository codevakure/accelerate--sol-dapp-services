import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true}})
export class ContractReq extends Entity {
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

  constructor(data?: Partial<ContractReq>) {
    super(data);
  }
}

export interface ContractReqRelations {
  // describe navigational properties here
}

export type ContractReqWithRelations = ContractReq & ContractReqRelations;
