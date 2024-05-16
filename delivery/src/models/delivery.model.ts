import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true}})
export class Delivery extends Entity {
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

  constructor(data?: Partial<Delivery>) {
    super(data);
  }
}

export interface DeliveryRelations {
  // describe navigational properties here
}

export type DeliveryWithRelations = Delivery & DeliveryRelations;
