import { Entity, model, property } from '@loopback/repository';

@model({ settings: { strict: false } })
export class Sol extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;


  @property({
    type: 'string',
  })
  sol_no?: string;

  @property({
    type: 'string',
  })
  amendment_no?: string;

  @property({
    type: 'boolean',
  })
  isAmendment?: boolean | undefined;

  @property({
    type: 'string',
  })
  Bundling: string;

  @property({
    type: 'boolean',
  })
  EDWOSB: boolean;

  @property({
    type: 'boolean',
  })
  SDVOB: boolean;

  @property({
    type: 'boolean',
  })
  Source: boolean;

  @property({
    type: 'boolean',
  })
  a27_no?: boolean;

  @property({
    type: 'boolean',
  })
  a27_yes?: boolean;

  @property({
    type: 'string',
  })
  acceptedBy?: string;

  @property({
    type: 'date',
  })
  acceptedDate?: Date;


  @property({
    type: 'string',
  })
  aco1?: string;

  @property({
    type: 'string',
  })
  acqAlternative?: string;

  @property({
    type: 'string',
  })
  acqConsideration?: string;


  @property({
    type: 'string',
  })
  acqMethod?: string;

  @property({
    type: 'string',
  })
  anticipatedPop?: string;

  @property({
    type: 'string',
  })
  awardType?: string;

  @property({
    type: 'string',
  })
  baAddress?: string;

  @property({
    type: 'string',
  })
  baEmail?: string;

  @property({
    type: 'string',
  })
  baName?: string;

  @property({
    type: 'string',
  })
  baPhone?: string;

  @property({
    type: 'string',
  })
  backgroundStatement?: string;

  @property({
    type: 'string',
  })
  bundlingDetermination?: string;


  @property({
    type: 'string',
  })
  capabilityPerformance?: string;


  @property({
    type: 'string',
  })
  catalogue?: string;


  @property({
    type: 'string',
  })
  categoryManagement?: string;


  @property({
    type: 'array',
    itemType: Object,
  })
  clause?: {}[];

  @property({
    type: 'string',
  })
  clearValue?: string;


  @property({
    type: 'string',
  })
  coAddress?: string;


  @property({
    type: 'string',
  })
  coEmail?: string;


  @property({
    type: 'string',
  })
  coName?: string;


  @property({
    type: 'string',
  })
  coOfficeName?: string;

  @property({
    type: 'string',
  })
  coPhone?: string;


  @property.array(Object, {
    name: 'collaborators',
    required: false
  })
  collaborators: any[];



  @property.array(Object, {
    name: 'commentMention',
    required: false
  })
  commentMention: any[];


  @property({
    type: 'string',
  })
  compatibility?: string;


  @property({
    type: 'string',
  })
  constraints?: string;

  @property({
    type: 'string',
  })
  contractNumber?: string;


  @property({
    type: 'string',
  })
  contractOfficer?: string;

  @property({
    type: 'string',
  })
  contractType?: string;


  @property({
    type: 'string',
  })
  contractVehicle?: string;


  @property({
    type: 'string',
  })
  contractingmethod?: string;


  @property({
    type: 'array',
    itemType: 'string',
  })
  corNominationUsers: string;

  @property({
    type: 'string',
  })
  cori1?: string;


  @property({
    type: 'string',
  })
  createdBy?: string;


  @property({
    type: 'string',
  })
  createdDate?: string;


  @property({
    type: 'string',
  })
  createdUserid?: string;


  @property({
    type: 'string',
  })
  createdUsername?: string;

  @property({
    type: 'string',
  })
  dateModified?: string;


  @property({
    type: 'string',
  })
  description?: string;


  @property({
    type: 'boolean',
  })
  eightA: boolean;


  @property({
    type: 'number',
  })
  estimatedBudgett: number;

  @property({
    type: 'string',
  })
  existingContract?: string;


  @property({
    type: 'string',
  })
  form_id?: string;

  @property({
    type: 'string',
  })
  governmentFurnishedInformation?: string;


  @property({
    type: 'string',
  })
  governmentFurnishedProperty?: string;


  @property({
    type: 'boolean',
  })
  hubzoneSB: boolean;


  @property({
    type: 'string',
  })
  idiq?: string;

  @property({
    type: 'string',
  })
  inputService?: string;

  @property({
    type: 'boolean',
  })
  is_commercial: boolean;



  @property({
    type: 'string',
  })
  issuededby?: string;


  @property.array(Object, {
    name: 'itemsTableData',
    required: false
  })
  itemsTableData: {}[];



  @property({
    type: 'string',
  })
  itornonit?: string;



  @property({
    type: 'string',
  })
  leasePurchase: string;

  @property({
    type: 'string',
  })
  managementInformationRequirements: string;



  @property({
    type: 'string',
  })
  method_of_solicitation?: string;


  @property({
    type: 'string',
  })
  naicscode?: string;


  @property({
    type: 'date',
  })
  offerDueDate?: Date;



  @property({
    type: 'string',
  })
  offerDueTime?: string;


  @property({
    type: 'string',
  })
  orderNumber?: string;


  @property({
    type: 'string',
  })
  organizationalConflict: string;


  @property({
    type: 'string',
  })
  percent?: string;


  @property({
    type: 'string',
  })
  performanceApproach?: string;


  @property({
    type: 'array',
    itemType: 'string',
  })
  pointsofContact: string;

  @property({
    type: 'string',
  })
  popendDate?: string;


  @property({
    type: 'string',
  })
  popstartDate?: string;


  @property({
    type: 'string',
  })
  productKind?: string;


  @property({
    type: 'string',
  })
  productService?: string;


  @property({
    type: 'string',
  })
  productkind?: string;


  @property({
    type: 'string',
  })
  productorService?: string;


  @property({
    type: 'string',
  })
  projectTitle?: string;


  @property({
    type: 'string',
  })
  proposedAction?: string;


  @property({
    type: 'string',
  })
  qandaDate?: string;


  @property({
    type: 'string',
  })
  qandaTime?: string;


  @property({
    type: 'string',
  })
  rAddress?: string;


  @property({
    type: 'string',
  })
  rEmail?: string;


  @property({
    type: 'string',
  })
  rName?: string;


  @property({
    type: 'string',
  })
  rPhone?: string;


  @property({
    type: 'string',
  })
  requirementsType?: string;


  @property({
    type: 'string',
  })
  requisitionNumber?: string;


  @property({
    type: 'string',
  })
  selection?: string;


  @property({
    type: 'string',
  })
  selection1?: string;


  @property({
    type: 'string',
  })
  serverable?: string;


  @property({
    type: 'string',
  })
  serviceKind?: string;


  @property({
    type: 'string',
  })
  servicekind?: string;


  @property({
    type: 'string',
  })
  setAside?: string;


  @property({
    type: 'string',
  })
  serverability: string;


  @property({
    type: 'array',
    itemType: 'string',
  })
  sharedCollaborators: string;

  @property({
    type: 'string',
  })
  similarContract?: string;


  @property({
    type: 'string',
  })
  similarNumber?: string;


  @property({
    type: 'string',
  })
  size_standards_dollars?: string;


  @property({
    type: 'string',
  })
  smallBusines: string;

  @property({
    type: 'boolean',
  })
  smallBusiness: boolean;



  @property({
    type: 'string',
  })
  spareParts: string;

  @property({
    type: 'string',
  })
  specialcontractingmethod: string;

  @property({
    type: 'string',
  })
  statementofNeed?: string;


  @property({
    type: 'string',
  })
  status?: string;



  @property({
    type: 'string',
  })
  subcontractCompetition: string;


  @property({
    type: 'string',
  })
  technicalHistory: string;


  @property({
    type: 'string',
  })
  typeofWork?: string;


  @property({
    type: 'string',
  })
  uniqueSolicitationClauses: string;


  @property({
    type: 'string',
  })
  unrestricted: string;




  @property({
    type: 'string',
  })
  userModified?: string;

  @property({
    type: 'string',
  })
  viewed?: string;

  @property({
    type: 'boolean',
  })
  womenSB?: boolean;

  @property({
    type: 'string',
  })
  startdate: string;


  @property({
    type: 'string',
  })
  ap_no?: string;


  @property({
    type: 'date',
  })
  awarddate?: Date;

  // @property({
  //   type: 'string',
  // })
  // awarddate?: string;


  @property({
    type: 'string',
  })
  awardedvendor?: string;


  @property({
    type: 'string',
  })
  performanceBasedAcq: string;


  @property({
    type: 'string',
  })
  igce2textarea: string;

  @property({
    type: 'string',
  })
  igce2: string;

  @property({
    type: 'string',
  })
  igce1: string;

  @property({
    type: 'string',
  })
  igce3textarea: string;

  @property({
    type: 'string',
  })
  igce3: string;


  @property({
    type: 'boolean',
  })
  noncomoption1: boolean;


  @property({
    type: 'boolean',
  })
  noncomoption3: boolean;


  @property({
    type: 'boolean',
  })
  noncomoption2: boolean;


  @property({
    type: 'boolean',
  })
  noncomoption4: boolean;


  @property({
    type: 'boolean',
  })
  noncomoption5: boolean;


  @property({
    type: 'boolean',
  })
  noncomoption6: boolean;



  @property({
    type: 'string',
  })
  severability?: string;

  @property({
    type: 'string',
  })
  initiatedBy?: string;

  @property({
    type: 'date',
  })
  initiatedDate?: Date;

  @property({
    type: 'string',
  })
  specialcontractingmethodText?: string;

  @property({
    type: 'string',
  })
  contractingmethodText?: string;


  @property({
    type: 'string',
  })
  organizationalConflictText?: string;
  
  @property({
    type: 'string',
    })
    amendate?: string;
    
    @property({
    type: 'string',
    })
    extensiondate?: string;
    
    @property({
    type: 'string',
    })
    ammendnotes?: string;
    
    @property({
    type: 'string',
    })
    fullHTML?: string;















  // @property({
  //   type: 'string',
  // })
  // projectTitle?: string;

  // @property({
  //   type: 'string',
  // })
  // typeOfWork?: string;

  // @property({
  //   type: 'string',
  // })
  // statementOfNeed?: string;

  // @property({
  //   type: 'string',
  // })
  // acquisitionConsiderations?: string;

  // @property({
  //   type: 'string',
  // })
  // capabilityPerformance?: string;

  // @property({
  //   type: 'date',
  // })
  // periodOfPerformance?: string;

  // @property({
  //   type: 'string',
  // })
  // contractVehicle?: string;

  // @property({
  //   type: 'string',
  // })
  // contractType?: string;

  // @property({
  //   type: 'string',
  // })
  // awardType?: string;

  // @property({
  //   type: 'string',
  // })
  // proposedSolicitationType?: string;

  // @property({
  //   type: 'string',
  // })
  // performanceBasedApproach?: string;

  // @property({
  //   type: 'string',
  // })
  // bundlingDetermination?: string;

  // @property({
  //   type: 'string',
  // })
  // contractingOfficer?: string;

  // @property({
  //   type: 'string',
  // })
  // requestor?: string;

  // @property({
  //   type: 'string',
  // })
  // budgetApprover?: string;

  // @property({
  //   type: 'date',
  // })
  // date?: string;

  // @property({
  //   type: 'string',
  // })
  // form_id?: string;

  // @property({
  //   type: 'string',
  // })
  // status?: string;

  // @property({
  //   type: 'string',
  // })
  // description?: string;

  // @property({
  //   type: 'string',
  // })
  // supplyorservice?: string;

  // @property({
  //   type: 'string',
  // })
  // itornonit?: string;

  // @property({
  //   type: 'string',
  // })
  // poc?: string;

  // @property({
  //   type: 'date',
  // })
  // createdDate?: string;

  // @property({
  //   type: 'string',
  // })
  // contractOfficer?: string;

  // @property({
  //   type: 'string',
  // })
  // createdBy?: string;

  // @property({
  //   type: 'string',
  // })
  // selection?: string;

  // @property({
  //   type: 'string',
  // })
  // contractNumber?: string;

  // @property({
  //   type: 'string',
  // })
  // productorService?: string;

  // @property({
  //   type: 'string',
  // })
  // catalogue?: string;

  // @property({
  //   type: 'string',
  // })
  // inputService?: string;

  // @property({
  //   type: 'string',
  // })
  // similarContract?: string;

  // @property({
  //   type: 'string',
  // })
  // initaitedBy?: string;

  // @property({
  //   type: 'string',
  // })
  // dsol_no?: string;

  // @property({
  //   type: 'string',
  // })
  // acqConsideration?: string;

  // @property({
  //   type: 'string',
  // })
  // acqMethod?: string;

  // @property({
  //   type: 'string',
  // })
  // baAddress?: string;

  // @property({
  //   type: 'string',
  // })
  // baEmail?: string;

  // @property({
  //   type: 'string',
  // })
  // baName?: string;

  // @property({
  //   type: 'string',
  // })
  // baPhone?: string;

  // @property({
  //   type: 'string',
  // })
  // coAddress?: string;

  // @property({
  //   type: 'string',
  // })
  // coEmail?: string;

  // @property({
  //   type: 'string',
  // })
  // coName?: string;

  // @property({
  //   type: 'string',
  // })
  // coPhone?: string;

  // @property({
  //   type: 'string',
  // })
  // endDate?: string;

  // @property({
  //   type: 'string',
  // })
  // existingContract?: string;

  // @property({
  //   type: 'string',
  // })
  // performanceApproach?: string;

  // @property({
  //   type: 'string',
  // })
  // rAddress?: string;

  // @property({
  //   type: 'string',
  // })
  // rEmail?: string;

  // @property({
  //   type: 'string',
  // })
  // rName?: string;

  // @property({
  //   type: 'string',
  // })
  // rPhone?: string;

  // @property({
  //   type: 'string',
  // })
  // startDate?: string;

  // @property({
  //   type: 'string',
  // })
  // requirementsType?: string;

  // @property({
  //   type: 'string',
  // })
  // productKind?: string;

  // @property({
  //   type: 'string',
  // })
  // sowid?: string;

  // @property({
  //   type: 'string',
  // })
  // evaluationCriteriaId?: string;

  // @property({
  //   type: 'string',
  // })
  // igceId?: string;

  // @property({
  //   type: 'string',
  // })
  // naicscode?: string;


  //  @property({
  //   type: 'string',
  //   //format: 'date',

  // })
  // offerDueDate?: Date;

  // @property({
  //   type: 'date',
  // })
  // acceptedDate?: Date;

  // @property({
  //   type: 'string',
  // })
  // createdUserid?: string;

  // @property({
  //   type: 'string',
  // })
  // currentuserid?: string;


  //  @property({
  //   type: 'array',
  //   itemType: 'string',
  //  })
  //  sharedCollaborators?: string;
  // // @property({
  // //   type: 'string',
  // // })
  // // sharedCollaborators?: string;

  //  @property({
  //    type: 'array',
  //    itemType: 'string',
  //  })
  //  pointsofContact?: string;

  // //  @property({
  // //   type: 'string',
  // // })
  // // ap_no?: string;


  // @property({
  //   type: 'string',
  // })
  // createdUsername?: string;


  // //contract_purpose
  // @property({
  //   type: 'string',
  // })
  // productService?: string;

  // //dollar_amount
  // @property({
  //   type: 'number',
  // })
  // estimatedBudgett?: number;

  // //contracting_method
  // @property({
  //   type: 'string',
  // })
  // contractingmethod?: string;


  // //key_words
  // @property({
  //   type: 'string',
  // })
  // similarNumber?: string;




  // @property({
  //   type: 'boolean',
  // })
  // is_commercial: boolean ;


  // @property({
  //   type: 'string',
  // })
  // Bundling?: string ;

  // @property({
  //   type: 'string',
  // })
  // EDWOSB?: string;

  // @property({
  //   type: 'string',
  // })
  // SDVOB?: string;

  // @property({
  //   type: 'string',
  // })
  // anticipatedPop?: string;

  // @property({
  //   type: 'string',
  // })
  // backgroundStatement?: string;

  // @property({
  //   type: 'string',
  // })
  // categoryManagement?: string;


  // @property({
  //   type: 'array',
  //   itemType: 'string',
  // })
  // collaborators: string;

  // @property({
  //   type: 'array',
  //   itemType: 'string',
  // })
  // commentMention: string;

  // @property({
  //   type: 'array',
  //   itemType: 'string',
  // })
  // corNominationUsers: string ;

  // @property({
  //   type: 'string',
  // })
  // eightA?: string;

  // @property({
  //   type: 'string',
  // })
  // hubzoneSB?: string;

  // @property({
  //   type: 'string',
  // })
  // method_of_solicitation?: string;



  // @property({
  //   type: 'string',
  // })
  // percent?: string;

  // @property({
  //   type: 'string',
  // })
  // popendDate?: string;

  // @property({
  //   type: 'string',
  // })
  // popstartDate?: string;

  // @property({
  //   type: 'string',
  // })
  // proposedAction?: string;

  // @property({
  //   type: 'string',
  // })
  // selection1?: string;

  // @property({
  //   type: 'string',
  // })
  // serverable?: string;

  // // @property({
  // //   type: 'string',
  // // })
  // // serviceKind?: string;


  // @property({
  //   type: 'string',
  // })
  // servicekind?: string;


  // @property({
  //   type: 'string',
  // })
  // setAside?: string;

  // @property({
  //   type: 'string',
  // })
  // smallBusiness?: string;

  // @property({
  //   type: 'string',
  // })
  // unrestricted?: string;

  // @property({
  //   type: 'string',
  // })
  // womenSB?: string;


  // @property({
  //   type: 'string',
  // })
  // clearValue?: string;

  // @property({
  //   type: 'string',
  // })
  // coOfficeName?: string;

  // @property({
  //   type: 'string',
  // })
  // dateModified?: string;

  // @property({
  //   type: 'string',
  // })
  // userModified?: string;

  // @property({
  //   type: 'string',
  // })
  // performanceBased?: string;



















//========================================================






  constructor(data?: Partial<Sol>) {
    super(data);
  }
}

export interface SolRelations {
  // describe navigational properties here
}

export type SolWithRelations = Sol & SolRelations;
