import { Entity, model, property, hasMany } from '@loopback/repository';
import { Evaluation } from "./evaluation.model";

@model({settings: { strict: false }})
export class ProposalEval extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  ID?: string;

  @property({
    type: 'string',
  })
  vendorId?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  evaluation?: object[];

  @hasMany(() => Evaluation)
  evaluations?: object[];


  // Define well-known properties here

  // Indexer property to allow additional data
  [prop: string]: any;

  constructor(data?: Partial<ProposalEval>) {
    super(data);
  }
}

export interface ProposalEvalRelations {
  evaluations?: object[];
  // describe navigational properties here
}

export type ProposalEvalWithRelations = ProposalEval & ProposalEvalRelations;
