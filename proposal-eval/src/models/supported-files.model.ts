import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Evaluation } from "./evaluation.model";

@model({settings: { strict: false }})
export class SupportedFiles extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  ID?: string;

  @property({
    type: 'string',
  })
  fileName?: string;

  @property({
    type: 'string',
  })
  pdfSrc?: string;

  @belongsTo(() => Evaluation)
  evaluationId: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  [prop: string]: any;

  constructor(data?: Partial<SupportedFiles>) {
    super(data);
  }
}

export interface SupportedFilesRelations {
  // describe navigational properties here
}

export type SupportedFilesWithRelations = SupportedFiles & SupportedFilesRelations;
