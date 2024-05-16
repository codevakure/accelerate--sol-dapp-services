import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Evaluation } from "./evaluation.model";

@model({settings: { strict: false }})
export class VendorFiles extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  ID?: string;

  @property({
    type: 'string',
  })
  volumeName?: string;

  @property({
    type: 'string',
  })
  pdfSrc?: string;

  @property({
    type: 'string',
  })
  strengths?: string;

  @property({
    type: 'string',
  })
  weekness?: string;

  @property({
    type: 'string',
  })
  deficiencies?: string;

  @property({
    type: 'string',
  })
  remarks?: string;

  @property({
    type: 'string',
  })
  score?: string;

  @belongsTo(() => Evaluation)
  evaluationId: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  [prop: string]: any;

  constructor(data?: Partial<VendorFiles>) {
    super(data);
  }
}

export interface VendorFilesRelations {
  // describe navigational properties here
}

export type VendorFilesWithRelations = VendorFiles & VendorFilesRelations;
