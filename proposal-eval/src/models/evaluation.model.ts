import { Entity, model, property, hasMany, belongsTo } from '@loopback/repository';
import { VendorFiles } from "./vendor-files.model";
import { SupportedFiles } from "./supported-files.model";
import { ProposalEval } from "./proposal-eval.model";

@model({settings: { strict: false }})
export class Evaluation extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  ID?: string;

  @property({
    type: 'string',
  })
  vendor?: string;

  @property({
    type: 'string',
  })
  date?: string;

  @property({
    type: 'string',
  })
  status?: string;

  @property({
    type: 'array',
    itemType: 'object',
  })
  vendorFiles?: VendorFiles[];

  @hasMany(() => VendorFiles)
  vendor_files?: VendorFiles[];

  @property({
    type: 'array',
    itemType: 'object',
  })
  supportedFiles?: SupportedFiles[];

  @hasMany(() => SupportedFiles)
  supported_files?: SupportedFiles[];

  @belongsTo(() => ProposalEval)
  proposalEvalId: string;


  @property({
    type: 'string',
  })
  volumepkId?: string;

  @property({
    type: 'string',
  })
  blockchainID?: string;

  @property({
    type: 'string',
  })
  description?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  [prop: string]: any;

  constructor(data?: Partial<Evaluation>) {
    super(data);
  }
}

export interface EvaluationRelations {
  vendor_files?: VendorFiles[];
  supported_files?: SupportedFiles[];
  // describe navigational properties here
}

export type EvaluationWithRelations = Evaluation & EvaluationRelations;
