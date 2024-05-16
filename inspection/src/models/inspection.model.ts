import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true}})
export class Inspection extends Entity {
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


  constructor(data?: Partial<Inspection>) {
    super(data);
  }
}

export interface InspectionRelations {
  // describe navigational properties here
}

export type InspectionWithRelations = Inspection & InspectionRelations;
