import { Entity, model, property } from '@loopback/repository';

@model({ settings: { strict: false } })
export class Evaluator extends Entity {

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  ID?: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  nda?: string;

  @property({
    type: 'string',
  })
  cor?: string;

  @property({
    type: 'string',
  })
  description?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Evaluator>) {
    super(data);
  }
}

export interface EvaluatorRelations {
  // describe navigational properties here
}

export type EvaluatorWithRelations = Evaluator & EvaluatorRelations;
