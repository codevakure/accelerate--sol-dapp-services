import { Entity, model, property } from '@loopback/repository';

@model({ settings: { strict: true } })
export class AmendmentDapp extends Entity {


  @property({
    type: 'string',
    id: true,
  })
  amendment_no?: string;

  @property({
    type: 'string',
  })
  sol_no?: string;

  @property({
    type: 'string',
    //id: true,
  })
  ap_no?: string;

  @property({
    type: 'string',
  })
  apId?: string;

  @property({
    type: 'string',
  })
  amendmentId?: string;

  @property({
    type: 'string',
  })
  solId?: string;

  @property({
    type: 'string',
  })
  sowid?: string;

  @property({
    type: 'string',
  })
  evaluationCriteriaId?: string;

  @property({
    type: 'string',
  })
  igceId?: string;

  @property({
    type: 'string',
  })
  estimateId?: string;

  @property({
    type: 'string',
  })
  competitionId?: string;

  @property({
    type: 'string',
  })
  compatibilityId?: string;

  @property({
    type: 'string',
  })
  constraintId?: string;

  @property({
    type: 'string',
  })
  tradeoffId?: string;

  @property({
    type: 'string',
  })
  requisitionId?: string;

  @property({
    type: 'string',
  })
  attachmentId?: string;

  @property({
    type: 'string',
  })
  certId?: string;

  @property({
    type: 'string',
  })
  formId?: string;

  @property({
    type: 'string',
  })
  supplyId?: string;


  @property({
    type: 'string',
  })
  packagingId?: string;

  @property({
    type: 'string',
  })
  inspectionId?: string;

  @property({
    type: 'string',
  })
  deliveryId?: string;

  @property({
    type: 'string',
  })
  contractAdminId?: string;

  @property({
    type: 'string',
  })
  contractReqId?: string;

  @property({
    type: 'string',
  })
  contractClauseId?: string;

  @property({
    type: 'string',
  })
  instructionId?: string;

  @property({
    type: 'string',
  })
  vendorQaId?: string;


  @property({
    type: 'string',
  })
  proposalEvalId?: string;


  @property({
    type: 'string',
  })
  evaluatorId?: string;

  @property({
    type: 'string',
  })
  collaboratorId?: string;

  @property({
    type: 'string',
  })
  corsId?: string;

  @property({
    type: 'string',
  })
  socId?: string;

  constructor(data?: Partial<AmendmentDapp>) {
    super(data);
  }
}

export interface AmendmentDappRelations {
  // describe navigational properties here
}

export type AmendmentDappWithRelations = AmendmentDapp & AmendmentDappRelations;
