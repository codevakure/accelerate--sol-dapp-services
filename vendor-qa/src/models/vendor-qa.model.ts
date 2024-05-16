import { Entity, model, property } from '@loopback/repository';

@model({settings: { strict: false }})
export class VendorQa extends Entity {
  @property({
    type: 'string',
    id: true,
   // generated: true,
  })
  id?: string;

  @property({
    type: 'string',

  })
  sol_no?: string;

  @property({
    type: 'string',
  })
  vendor?: string;

  @property({
    type: 'string',
  })
  vendorId?: string;

  @property({
    type: 'string',
  })
  question?: string;


  @property({
    type: 'string',
  })
  status?: string;

  @property({
    type: 'string',
  })
  response?: string;

  @property({
    type: 'string',
  })
  assigned?: string;

  @property({
    type: 'Object',
  })
  referenceType?: any;

  @property({
    type: 'string',
  })
  assignedEmail?: string;

  @property({
    type: 'string',
  })
  description?: string;

  constructor(data?: Partial<VendorQa>) {
    super(data);
  }
}

export interface VendorQaRelations {
  // describe navigational properties here
}

export type VendorQaWithRelations = VendorQa & VendorQaRelations;
