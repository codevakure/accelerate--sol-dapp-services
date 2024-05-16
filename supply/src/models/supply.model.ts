import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true}})
export class Supply extends Entity {
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




  constructor(data?: Partial<Supply>) {
    super(data);
  }
}

export interface SupplyRelations {
  // describe navigational properties here
}

export type SupplyWithRelations = Supply & SupplyRelations;
