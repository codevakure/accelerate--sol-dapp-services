import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true}})
export class Instruction extends Entity {
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


  constructor(data?: Partial<Instruction>) {
    super(data);
  }
}

export interface InstructionRelations {
  // describe navigational properties here
}

export type InstructionWithRelations = Instruction & InstructionRelations;
