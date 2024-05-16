import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true}})
export class Packaging extends Entity {
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

  constructor(data?: Partial<Packaging>) {
    super(data);
  }
}

export interface PackagingRelations {
  // describe navigational properties here
}

export type PackagingWithRelations = Packaging & PackagingRelations;
