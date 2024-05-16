import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Soc extends Entity {
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

  constructor(data?: Partial<Soc>) {
    super(data);
  }
}

export interface SocRelations {
  // describe navigational properties here
}

export type SocWithRelations = Soc & SocRelations;
