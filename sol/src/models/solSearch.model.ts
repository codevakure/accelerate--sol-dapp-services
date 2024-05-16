import { Entity, model, property, Model } from '@loopback/repository';

@model({ settings: {strict: true} })
export class SolSearch extends Model {

  @property({
    type: 'string',
  })
  id?: string;

  @property({
    type: 'string',
  })
  sol_no?: string;

  //title
  @property({
    type: 'string',
  })
  projectTitle?: string;

  //dueDate
  @property({
    type: 'string',
  })
  offerDueDate?: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
  })
  status?: string;

  @property({
    type: 'string',
  })
  sin?: string;

//noticeType
  @property({
    type: 'string',
  })
  method_of_solicitation?: string;
  
  //location
  @property({
    type: 'string',
  })
  baAddress?: string;

  @property({ 
    type: 'string',
   }) 
  naicscode?: string;

  //  agency
  @property({ 
    type: 'string',
   }) 
  coOfficeName?: 'string';


  @property({
    type: 'string',
  })
  capabilityPerformance?: string;


  @property({
    type: 'string',
  })
  contractVehicle?: string;

  @property({
    type: 'string',
  })
  contractType?: string;


  @property({
    type: 'string',
  })
  awardType?: string;


  @property({
    type: 'string',
  })
  bundlingDetermination?: string;



  @property({
    type: 'string',
  })
  itornonit?: string;

  @property({
    type: 'date',
  })
  createdDate?: Date;

  @property({
    type: 'string',
  })
  contractOfficer?: string;


  @property({
    type: 'string',
  })
  selection?: string;


  @property({
    type: 'string',
  })
  contractNumber?: string;


  @property({
    type: 'string',
  })
  productorService?: string;


  @property({
    type: 'string',
  })
  catalogue?: string;


  @property({
    type: 'string',
  })
  inputService?: string;


  @property({
    type: 'string',
  })
  similarContract?: string;



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
  coPhone?: string;


  @property({
    type: 'string',
  })
  existingContract?: string;



  @property({
    type: 'string',
  })
  performanceApproach?: string;


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
  productKind?: string;


  @property({
    type: 'string',
  })
  createdUserid?: string;



  @property({
    type: 'string',
  })
  createdUsername?: string;


  @property({
    type: 'array',
    itemType: 'string',
  })
  sharedCollaborators: string;


  @property({
    type: 'array',
    itemType: 'string',
  })
  pointsofContact: string;


  @property({
    type: 'string',
  })
  productService?: string;


  @property({
    type: 'number',
  })
  estimatedBudgett: number;



  @property({
    type: 'string',
  })
  contractingmethod?: string;



  @property({
    type: 'string',
  })
  similarNumber?: string;


  @property({
    type: 'boolean',
  })
  is_commercial: boolean;



  @property({
    type: 'string',
  })
  Bundling?: string;



  @property({
    type: 'boolean',
  })
  EDWOSB: boolean;


  @property({
    type: 'boolean',
  })
  SDVOB: boolean;


  @property({
    type: 'string',
  })
  anticipatedPop?: string;


  @property({
    type: 'string',
  })
  backgroundStatement?: string;


  @property({
    type: 'string',
  })
  categoryManagement?: string;


  // @property({
  //   type: 'array',
  //   itemType: 'string',
  // })
  // collaborators: string;

  @property.array(Object, {
    name: 'collaborators',
    required: false
  })
  collaborators: any[];


  // @property({
  //   type: 'array',
  //   itemType: 'string',
  // })
  // commentMention: any[];


  @property.array(Object, {
    name: 'commentMention',
    required: false
  })
  commentMention: any[];

  @property({
    type: 'array',
    itemType: 'string',
  })
  corNominationUsers: string;


  @property({
    type: 'boolean',
  })
  eightA?: boolean;



  @property({
    type: 'boolean',
  })
  hubzoneSB: boolean;


  @property({
    type: 'string',
  })
  percent?: string;


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
  productkind?: string;



  @property({
    type: 'string',
  })
  proposedAction?: string;



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
    type: 'boolean',
  })
  smallBusiness: boolean;



  @property({
    type: 'string',
  })
  statementofNeed?: string;


  @property({
    type: 'string',
  })
  typeofWork?: string;



  @property({
    type: 'string',
  })
  unrestricted?: string;


  @property({
    type: 'boolean',
  })
  womenSB: boolean;



  @property({
    type: 'string',
  })
  clearValue?: string;


  @property({
    type: 'string',
  })
  dateModified?: string;


  @property({
    type: 'boolean',
  })
  noncomoption1: boolean;


  @property({
    type: 'boolean',
  })
  noncomoption3: boolean;


  @property({
    type: 'string',
  })
  userModified?: string;


  @property({
    type: 'boolean',
  })
  Source: boolean;


  @property({
    type: 'string',
  })
  technicalHistory?: string;


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
  smallBusines?: string;


  @property({
    type: 'string',
  })
  acqAlternative?: string;



  @property({
    type: 'string',
  })
  specialcontractingmethod?: string;


  @property({
    type: 'string',
  })
  idiq?: string;


  @property({
    type: 'string',
  })
  subcontractCompetition?: string;


  @property({
    type: 'string',
  })
  uniqueSolicitationClauses?: string;



  @property({
    type: 'string',
  })
  governmentFurnishedProperty?: string;


  @property({
    type: 'string',
  })
  governmentFurnishedInformation?: string;


  @property({
    type: 'string',
  })
  managementInformationRequirements?: string;


  @property({
    type: 'string',
  })
  organizationalConflict?: string;



  @property({
    type: 'string',
  })
  severability?: string;



  @property({
    type: 'string',
  })
  leasePurchase?: string;



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
  spareParts: string;


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
    type: 'date',
  })
  acceptedDate?: Date;

  @property({
    type: 'string',
  })
  acceptedBy: string;

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
  specialcontractingmethodText: string;

  @property({
    type: 'string',
  })
  contractingmethodText: string;


  @property({
    type: 'string',
  })
  organizationalConflictText: string;


  constructor(data?: Partial<SolSearch>) {
    super(data);
  }

}


