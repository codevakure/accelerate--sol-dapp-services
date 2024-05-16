import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true}})
export class Cert extends Entity {
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
  clause: {}[];
  

  constructor(data?: Partial<Cert>) {
    super(data);
  }
}

export interface CertRelations {
  // describe navigational properties here
}

export type CertWithRelations = Cert & CertRelations;
