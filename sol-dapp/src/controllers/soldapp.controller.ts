import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
  AnyScopeFilterSchema,
} from '@loopback/rest';
import { SolDapp, AiSvc } from '../models';
import { SolDappRepository } from '../repositories';
import { AmendmentDappRepository } from '../repositories';
import { AmendmentDapp } from '../models/amendment-dapp.model';
const loopback = require("loopback");
const pEvent = require('p-event');

export class SoldappController {
  constructor(
    @repository(SolDappRepository)
    public solDappRepository: SolDappRepository,
    @repository(AmendmentDappRepository)
    public amendmentDappRepository: AmendmentDappRepository,
  ) { }

  // Simple healthcheck function for the HTTP GET on /email-service.  The ALB is expecting a 200 for this
  @get('/acc-api/sol-dapp/health', {
    responses: {
      '204': {
        description: 'Healthcheck status ok',
      },
    },
  })
  async healthCheck(): Promise<String> {
    return "status: ok";
  }


  @get('/acc-api/sol-dapp/{ap_no}/getSolDappByApNo', {
    responses: {
      '200': {
        description: 'SolDapp json ',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': SolDapp } },
          },
        },
      },
    },
  })
  async getSolDappByApNo(@param.path.string('ap_no') ap_no: string
  ): Promise<any> {
    const myfilter: Filter<SolDapp> = { where: { ap_no: ap_no } };
    return await this.solDappRepository.find(myfilter);
  }




  @get('/acc-api/sol-dapp/ap/{id}/initiateSol', {
    responses: {
      '204': {
        description: 'Read AP asset from blockchain and saved in Aurotec DB successfully',
      },
    },
  })
  async initiateSol(@param.path.string('id') id: string, ): Promise<SolDapp> {
    //const token: string = jwtToken.replace(/Bearer /g,'');
    //console.log("Token ............"+token);
    console.log("ID ...==============================================" + id)
    let error: any = {};
    try {
      const apDappService = await getServiceConstant(process.env.AP_DAPP_OPENAPI, 'ApDappService');
      const ap_no = id;
      console.log("Going to write asset ----------------------------------")
      //await apDappService.DappController_acceptAp({ ap_no });
      await apDappService.DappController_acceptAp(ap_no);
      //await apDappService.DappController_acceptApRemote({ ap_no , token});
    } catch (err) {
      console.log(err);
      error = {
        "error": {
          "code": 503,
          "message": "ApDapp service not available"
        }
      };
      return error;
    }

    console.log("Going to read asset ----------------------------------")
    let apFullJson;
    try {
      const blockchainService = await getServiceConstant(process.env.BLOCKCHAIN_OPENAPI, 'BlockChainService');
      console.log("BC ----------------------------------")
      //apFullJson = await blockchainService.BcController_getAsset({ id });
      apFullJson = await blockchainService.BcController_getAsset(id);
      console.log("AP full -----------------------------")
      console.log(apFullJson);
    } catch (err) {
      console.log(err);
      error = {
        "error": {
          "code": 503,
          "message": "Blockchain Service not available"
        }
      };
      return error;
    }


    const solDapp = new SolDapp();
    const aiSvc = new AiSvc();
    let solService;
    let sol_no;
    // solDapp.ap_no = id;
    try {
      const idService = await getServiceConstant(process.env.ID_SERVICE, 'IdService');
      const solNum = await idService.IdController_genSolID();
      solDapp.sol_no = solNum['obj'].id;

      //console.log("Ok till here got sol number--------------------------------------------------------" + solDapp.sol_no);
      solService = await getServiceConstant(process.env.SOL_OPENAPI, 'SolService');
      // console.log(JSON.stringify(solDapp));

      sol_no = solDapp.sol_no;
    } catch (err) {
      console.log(err);
      error = {
        "error": {
          "code": 503,
          "message": "ID or Sol service not available"
        }
      };
      return error;
    }

    let solJson = apFullJson['body']['AP'];
    console.log("AP/Sol--------------------------------------------------------");
    console.log(solJson);
    //console.log(solJson);
    try {
      Object.keys(solJson).forEach(function (key) {
        // console.log(key);
        if (key === 'id') {
          delete solJson[key];
        }
        if (key === 'ap_no') {
          solDapp.ap_no = solJson[key];
          delete solJson[key];
        }
        if (key === 'contractType') {
          // console.log("contract_type key-----------------------------------------------------------"+key);
          aiSvc.contract_type = solJson[key];
        }
        // if (key === 'productService') {
        //   aiSvc.contract_purpose = solJson[key];
        // }

        if (key === 'productService') {
          //console.log("categories key-----------------------------------------------------------"+key);
          aiSvc.categories = solJson[key];
        }

        if (key === 'contractingmethod') {
          //console.log("contracting_method key-----------------------------------------------------------"+key);
          aiSvc.contracting_method = solJson[key];
        }
        if (key === 'is_commercial') {
          // console.log("is_commercial key-----------------------------------------------------------"+key);
          aiSvc.is_commercial = solJson[key];
        }
        if (key === 'estimatedBudgett') {
          // console.log("dollar_amount key-----------------------------------------------------------"+key);
          aiSvc.dollar_amount = solJson[key];
        }
        if (key === 'similarNumber') {
          // console.log("keyword key-----------------------------------------------------------"+key);
          const keyword = solJson[key];
          aiSvc.key_words = typeof parseInt(keyword);
        }

        if (key === 'Bundling') {
          console.log(">>>>>>>>>>>>>>>>>" + solJson[key]);
          // if (solJson[key] === '') {
          //   solJson[key] = false;
          //   console.log(">>>>>>>>>>>>>>>>>" + solJson[key]);
          // }
        }

        if (key === 'EDWOSB') {
          console.log(">>>>>>>>>>>>>>>>>" + solJson[key]);
          if (solJson[key] === '') {
            solJson[key] = false;
            console.log(">>>>>>>>>>>>>>>>>" + solJson[key]);
          }
        }

        if (key === 'SDVOB') {
          console.log(">>>>>>>>>>>>>>>>>" + solJson[key]);
          if (solJson[key] === '') {
            solJson[key] = false;
            console.log(">>>>>>>>>>>>>>>>>" + solJson[key]);
          }
        }

        if (key === 'eightA') {
          console.log(">>>>>>>>>>>>>>>>>" + solJson[key]);
          if (solJson[key] === '') {
            solJson[key] = false;
            console.log(">>>>>>>>>>>>>>>>>" + solJson[key]);
          }
        }

        if (key === 'hubzoneSB') {
          console.log(">>>>>>>>>>>>>>>>>" + solJson[key]);
          if (solJson[key] === '') {
            solJson[key] = false;
            console.log(">>>>>>>>>>>>>>>>>" + solJson[key]);
          }
        }

        if (key === 'smallBusiness') {
          console.log(">>>>>>>>>>>>>>>>>" + solJson[key]);
          if (solJson[key] === '') {
            solJson[key] = false;
            console.log(">>>>>>>>>>>>>>>>>" + solJson[key]);
          }
        }
        if (key === 'womenSB') {
          console.log(">>>>>>>>>>>>>>>>>" + solJson[key]);
          if (solJson[key] === '') {
            solJson[key] = false;
            console.log(">>>>>>>>>>>>>>>>>" + solJson[key]);
          }
        }




      });
      console.log("Id and ap_no attributes are stripped off ________________________________________");
      //console.log(solJson);
      //let ap_no = solDapp.sol_no;
      let isAmendment = false;
      solJson = { ...solJson, sol_no };
      solJson = { ...solJson, isAmendment };
      console.log("Sol no appeded. ________________________________________");
      console.log(solJson);
      //const apService = await getServiceConstant(process.env.AP_OPENAPI, 'ApService');
      //const ap = await apService.ApController_create(JSON.stringify(apJson));
      //solDapp.apId = ap['obj'].id;

      //const sol = await solService.SolController_create(JSON.stringify(solJson));
      //Refactored due to upgrade
      const sol = await solService.SolController_create(solJson);

      solDapp.solId = sol['obj'].id;
      console.log("Sol saved--------------------------------------------------------");

    } catch (err) {
      console.log(err);
      error = {
        "error": {
          "code": 503,
          "message": "Sol service not available"
        }
      };
      return error;
    }

    let ai;
    try {
      console.log(JSON.stringify(aiSvc));
      const aiJson = await getServiceConstant(process.env.AI_SERVICE_OPENAPI, 'AIService');
      //ai = await aiJson.AiController_searchClause(JSON.stringify(aiSvc));
      ai = await aiJson.AiController_searchClause(aiSvc);
      console.log("print AI")
      console.log("aiSvc-----------");
      // console.log(aiSvc);
      ///  console.log("ai-----------");
      // console.log(ai);
      if (ai['body']['statusCode'] == 400) {

        error =
        {
          "statusCode": 400,
          "message": JSON.parse(ai['body']['message'])
        };

        throw error;
      }

    } catch (err) {
      //console.log("err log -----------"+err);
      console.error('ERROR :', err);

      return err;




      // error = {
      //   "error": {
      //     "code": 503,
      //     "message": "AI service not available"
      //   }
      // };
      // error = {
      //   "error": {
      //     "code": 400,
      //     "message": "Invalid JSON for AI Service"
      //   }
      // };
      //return error;
    }
    console.log("AI logic------------");
    // console.log(ai['body']['required']);
    const required = ai['body']['required'];
    const applicable = ai['body']['applicable'];
    const optional = ai['body']['optional'];
    const others = ai['body']['others'];
    let sop: any[] = [];
    const key = 'clause';

    //console.log("apFullJson ---------------------------------------------");
    // console.log(apFullJson);


    const sowJson = apFullJson['body']['SOW'];
    console.log("SOW retrieved -----------------------");
    console.log(sowJson);
    try {
      Object.keys(sowJson).forEach(function (key) {
        console.log(key);
        if (key == 'id') {
          delete sowJson[key];
        }
      });
      console.log("SOW Id stripped off -----------------------");

      const sowService = await getServiceConstant(process.env.SOW_OPENAPI, 'SowService');

      sowJson.clause = []; // empty Array, which you can push() values into
      sowJson[key].push(filterArrayResults(required, "C", 'required'));
      sowJson[key].push(filterArrayResults(applicable, "C", 'applicable'));
      sowJson[key].push(filterArrayResults(optional, "C", 'optional'));
      sowJson[key].push(filterArrayResults(others, "C", 'others'));
      console.log(sowJson);
      //const sow = await sowService.SowController_create(JSON.stringify(sowJson));
      //Refactored due to upgrade
      const sow = await sowService.SowController_create(sowJson);
      solDapp.sowid = sow['obj'].id;
      console.log("SOW new Id assigned -----------------------");
      console.log(sowJson);
      console.log("SOW saved--------------------------------------------------------");
    } catch (err) {
      error = {
        "error": {
          "code": 503,
          "message": "SOW service not available"
        }
      };
      return error;
    }
    const evalJson = apFullJson['body']['Evaluation_Criteria'];
    try {
      // console.log("Retrieved -----------------------------------------");
      console.log(evalJson);
      Object.keys(evalJson).forEach(function (key) {
        // console.log(key);
        if (key == 'id') {
          delete evalJson[key];
        }
      });

      // evalJson = apFullJson['Evaluation_Criteria'];
      // console.log("Retrieved 2 -----------------------------------------");
      // console.log(evalJson);
      const evalCrtService = await getServiceConstant(process.env.EVALUATIONCRITERIA_OPENAPI, 'EvalCrtService');
      evalJson.clause = []; // empty Array, which you can push() values into
      evalJson[key].push(filterArrayResults(required, "M", 'required'));
      evalJson[key].push(filterArrayResults(applicable, "M", 'applicable'));
      evalJson[key].push(filterArrayResults(optional, "M", 'optional'));
      evalJson[key].push(filterArrayResults(others, "M", 'others'));

      //const evalC = await evalCrtService.EvaluationCriteriaController_create(JSON.stringify(evalJson));
      //Refactored due to upgrade
      const evalC = await evalCrtService.EvaluationCriteriaController_create(evalJson);

      solDapp.evaluationCriteriaId = evalC['obj'].id;
      console.log("Eval saved--------------------------------------------------------");

    } catch (err) {
      error = {
        "error": {
          "code": 503,
          "message": "Evaluation Criteria service not available"
        }
      };
      return error;
    }


    // const estJson = apFullJson['body']['ESTIMATE'];
    // try {
    //   Object.keys(estJson).forEach(function (key) {
    //     // console.log(key);
    //     if (key == 'id') {
    //       delete estJson[key];
    //     }
    //   });
    //   console.log("EST------------------------------");
    //   console.log(estJson);
    //   const estimateService = await getServiceConstant(process.env.ESTIMATES_OPENAPI, 'EstimateService');
    //   const est = await estimateService.EstimatesController_create(JSON.stringify(estJson));
    //   solDapp.estimateId = est['obj'].id;
    //   console.log("EST saved--------------------------------------------------------");
    //   const igceService = await getServiceConstant(process.env.IGCE_OPENAPI, 'IgceService');
    //   const igce = await igceService.IgceController_create({});
    //   solDapp.igceId = igce['obj'].id;
    // } catch (err) {
    //   error = {
    //     "error": {
    //       "code": 503,
    //       "message": "IGCE service not available"
    //     }
    //   };
    //   return error;
    // }
    // console.log("IGCE saved--------------------------------------------------------");
    // try {
    //   const competitionService = await getServiceConstant(process.env.COMPETITION_OPENAPI, 'CompetitionService');
    //   const compotitions = await competitionService.CompetitionController_create({});
    //   solDapp.competitionId = compotitions['obj'].id;
    //   console.log("Competition saved--------------------------------------------------------");
    // } catch (err) {
    //   error = {
    //     "error": {
    //       "code": 503,
    //       "message": "Competition service not available"
    //     }
    //   };
    //   return error;
    // }

    try {
      const compatibilityService = await getServiceConstant(process.env.COMPATIBILITY_OPENAPI, 'CompatibilityService');
      const compatibility = await compatibilityService.CompatibilityController_create({});
      solDapp.compatibilityId = compatibility['obj'].id;
      console.log("Compatibility saved--------------------------------------------------------");
    } catch (err) {
      error = {
        "error": {
          "code": 503,
          "message": "Compatibility service not available"
        }
      };
      return error;
    }

    try {
      const tradeoffService = await getServiceConstant(process.env.TRADEOFFS_OPENAPI, 'TradeoffService');
      const tradeoff = await tradeoffService.TradeoffsController_create({});
      solDapp.tradeoffId = tradeoff['obj'].id;
      console.log("Tradeoff saved--------------------------------------------------------");
    } catch (err) {
      error = {
        "error": {
          "code": 503,
          "message": "Tradeoff service not available"
        }
      };
      return error;
    }

    // try {
    //   const constraintService = await getServiceConstant(process.env.CONSTRAINTS_OPENAPI, 'ConstraintService');
    //   const constraint = await constraintService.ConstraintsController_create({});
    //   solDapp.constraintId = constraint['obj'].id;
    //   console.log("Constraint saved--------------------------------------------------------");
    // } catch (err) {
    //   error = {
    //     "error": {
    //       "code": 503,
    //       "message": "Evaluation Criteria service not available"
    //     }
    //   };
    //   return error;
    // }

    try {
      const requisitionService = await getServiceConstant(process.env.REQUISITION_OPENAPI, 'RequisitionService');
      const requisition = await requisitionService.RequistionController_create({});
      solDapp.requisitionId = requisition['obj'].id;
      console.log("Requisition saved--------------------------------------------------------");
    } catch (err) {
      error = {
        "error": {
          "code": 503,
          "message": "Requisition service not available"
        }
      };
      return error;
    }

    try {
      const formService = await getServiceConstant(process.env.FORM_OPENAPI, 'FormService');
      const formJson: any = {} // empty Object
      formJson.clause = []; // empty Array, which you can push() values into
      formJson[key].push(filterArrayResults(required, "A", 'required'));
      formJson[key].push(filterArrayResults(applicable, "A", 'applicable'));
      formJson[key].push(filterArrayResults(optional, "A", 'optional'));
      formJson[key].push(filterArrayResults(others, "A", 'others'));

      //const form = await formService.FormController_create(JSON.stringify(formJson));
      //Refatored due to upgrade
      const form = await formService.FormController_create(formJson);
      solDapp.formId = form['obj'].id;
      console.log("Form saved--------------------------------------------------------");
    } catch (err) {
      error = {
        "error": {
          "code": 503,
          "message": "Form service not available"
        }
      };
      return error;
    }

    try {
      const supplyService = await getServiceConstant(process.env.SUPPLY_OPENAPI, 'SupplyService');
      const supplyJson: any = {} // empty Object
      supplyJson.clause = []; // empty Array, which you can push() values into
      supplyJson[key].push(filterArrayResults(required, "B", 'required'));
      supplyJson[key].push(filterArrayResults(applicable, "B", 'applicable'));
      supplyJson[key].push(filterArrayResults(optional, "B", 'optional'));
      supplyJson[key].push(filterArrayResults(others, "B", 'others'));

      //const supply = await supplyService.SupplyController_create(JSON.stringify(supplyJson));
      //Refatored due to upgrade
      const supply = await supplyService.SupplyController_create(supplyJson);

      solDapp.supplyId = supply['obj'].id;
      console.log("Supply saved--------------------------------------------------------");
    } catch (err) {
      error = {
        "error": {
          "code": 503,
          "message": "SupplyService service not available"
        }
      };
      return error;
    }


    try {
      const packagingService = await getServiceConstant(process.env.PACKAGING_OPENAPI, 'PackagingService');
      const packagingJson: any = {} // empty Object
      packagingJson.clause = []; // empty Array, which you can push() values into
      packagingJson[key].push(filterArrayResults(required, "D", 'required'));
      packagingJson[key].push(filterArrayResults(applicable, "D", 'applicable'));
      packagingJson[key].push(filterArrayResults(optional, "D", 'optional'));
      packagingJson[key].push(filterArrayResults(others, "D", 'others'));

      //const packaging = await packagingService.PackagingController_create(JSON.stringify(packagingJson));
      //Refatored due to upgrade
      const packaging = await packagingService.PackagingController_create(packagingJson);
      solDapp.packagingId = packaging['obj'].id;
      console.log("Packaging saved-------------------------------------------------------- " + solDapp.packagingId);
    } catch (err) {
      error = {
        "error": {
          "code": 503,
          "message": "Packaging service not available"
        }
      };
      return error;
    }


    try {
      const certService = await getServiceConstant(process.env.CERT_OPENAPI, 'CertService');
      const certJson: any = {} // empty Object
      certJson.clause = []; // empty Array, which you can push() values into
      certJson[key].push(filterArrayResults(required, "K", 'required'));
      certJson[key].push(filterArrayResults(applicable, "K", 'applicable'));
      certJson[key].push(filterArrayResults(optional, "K", 'optional'));
      certJson[key].push(filterArrayResults(others, "K", 'others'));

      //const cert = await certService.CertController_create(JSON.stringify(certJson));
      //Refatored due to upgrade
      const cert = await certService.CertController_create(certJson);
      solDapp.certId = cert['obj'].id;
      console.log("CERT saved--------------------------------------------------------");
    } catch (err) {
      error = {
        "error": {
          "code": 503,
          "message": "Cert service not available"
        }
      };
      return error;
    }


    try {
      const instructionService = await getServiceConstant(process.env.INSTRUCTION_OPENAPI, 'InstructionService');

      const instructionJson: any = {} // empty Object
      instructionJson.clause = []; // empty Array, which you can push() values into
      // o[key].push(transformKeys(filterArrayResults(required, "K")));
      // o[key].push(filterArrayResults(applicable, "K"));
      // o[key].push(filterArrayResults(optional, "K"));
      // o[key].push(filterArrayResults(required, "K"));

      // instructionJson[key].push('required');

      console.log(instructionJson)
      instructionJson[key].push(filterArrayResults(required, "L", 'required'));
      instructionJson[key].push(filterArrayResults(applicable, "L", 'applicable'));
      instructionJson[key].push(filterArrayResults(optional, "L", 'optional'));
      instructionJson[key].push(filterArrayResults(others, "L", 'others'));

      //const instruction = await instructionService.InstructionController_create(JSON.stringify(instructionJson));
      //Refatored due to upgrade
      const instruction = await instructionService.InstructionController_create(instructionJson);
      solDapp.instructionId = instruction['obj'].id;
      console.log("Instruction saved-------------------------------------------------------- " + solDapp.instructionId);
    } catch (err) {
      error = {
        "error": {
          "code": 503,
          "message": "Instruction service not available"
        }
      };
      return error;
    }

    try {
      const deliveryService = await getServiceConstant(process.env.DELIVERY_OPENAPI, 'DeliveryService');
      const deliveryJson: any = {} // empty Object
      deliveryJson.clause = []; // empty Array, which you can push() values into
      deliveryJson[key].push(filterArrayResults(required, "F", 'required'));
      deliveryJson[key].push(filterArrayResults(applicable, "F", 'applicable'));
      deliveryJson[key].push(filterArrayResults(optional, "F", 'optional'));
      deliveryJson[key].push(filterArrayResults(others, "F", 'others'));

      //const delivery = await deliveryService.DeliveryController_create(JSON.stringify(deliveryJson));
      //Refatored due to upgrade
      const delivery = await deliveryService.DeliveryController_create(deliveryJson);
      solDapp.deliveryId = delivery['obj'].id;
      console.log("Delivery saved--------------------------------------------------------");
    } catch (err) {
      error = {
        "error": {
          "code": 503,
          "message": "Delivery service not available"
        }
      };
      return error;
    }

    try {
      const inspectionService = await getServiceConstant(process.env.INSPECTION_OPENAPI, 'InspectionService');
      const inspectionJson: any = {} // empty Object
      inspectionJson.clause = []; // empty Array, which you can push() values into
      inspectionJson[key].push(filterArrayResults(required, "E", 'required'));
      inspectionJson[key].push(filterArrayResults(applicable, "E", 'applicable'));
      inspectionJson[key].push(filterArrayResults(optional, "E", 'optional'));
      inspectionJson[key].push(filterArrayResults(others, "E", 'others'));

      //const inspection = await inspectionService.InspectionController_create(JSON.stringify(inspectionJson));
      //Refatored due to upgrade
      const inspection = await inspectionService.InspectionController_create(inspectionJson);
      solDapp.inspectionId = inspection['obj'].id;
      console.log("Inspection saved--------------------------------------------------------");
    } catch (err) {
      error = {
        "error": {
          "code": 503,
          "message": "Inspection service not available"
        }
      };
      return error;
    }

    try {
      const contractAdminService = await getServiceConstant(process.env.CONTRACT_ADMIN_OPENAPI, 'ContractAdminService');
      const contractAdminJson: any = {} // empty Object
      contractAdminJson.clause = []; // empty Array, which you can push() values into
      contractAdminJson[key].push(filterArrayResults(required, "G", 'required'));
      contractAdminJson[key].push(filterArrayResults(applicable, "G", 'applicable'));
      contractAdminJson[key].push(filterArrayResults(optional, "G", 'optional'));
      contractAdminJson[key].push(filterArrayResults(others, "G", 'others'));

      //const contractAdmin = await contractAdminService.ContractAdminController_create(JSON.stringify(contractAdminJson));
      //Refatored due to upgrade
      const contractAdmin = await contractAdminService.ContractAdminController_create(contractAdminJson);
      solDapp.contractAdminId = contractAdmin['obj'].id;
      console.log("ContractAdmin saved--------------------------------------------------------");

    } catch (err) {
      error = {
        "error": {
          "code": 503,
          "message": "Contract Admin service not available"
        }
      };
      return error;
    }

    try {
      const contractClauseService = await getServiceConstant(process.env.CONTRACT_CLAUSE_OPENAPI, 'ContractClauseService');
      const contractClauseJson: any = {} // empty Object
      contractClauseJson.clause = []; // empty Array, which you can push() values into
      contractClauseJson[key].push(filterArrayResults(required, "I", 'required'));
      contractClauseJson[key].push(filterArrayResults(applicable, "I", 'applicable'));
      contractClauseJson[key].push(filterArrayResults(optional, "I", 'optional'));
      contractClauseJson[key].push(filterArrayResults(others, "I", 'others'));
      contractClauseJson[key].push(filterArrayResults(sop, "I", 'sop'));
      //contractClauseJson[key].push(sop);
      console.log("sop ========" + sop);
      console.log("contractClauseJson ======================================");
      console.log(contractClauseJson);
      //const contractClause = await contractClauseService.ContractClauseController_create(JSON.stringify(contractClauseJson));
      //Refatored due to upgrade
      const contractClause = await contractClauseService.ContractClauseController_create(contractClauseJson);
      solDapp.contractClauseId = contractClause['obj'].id;
      console.log("ContractClause saved []--------------------------------------------------------");
    } catch (err) {
      error = {
        "error": {
          "code": 503,
          "message": "Contract Clause service not available"
        }
      };
      return error;
    }

    try {
      const contractReqService = await getServiceConstant(process.env.CONTRACT_REQ_OPENAPI, 'ContractReqService');
      const contractReqJson: any = {} // empty Object
      contractReqJson.clause = []; // empty Array, which you can push() values into
      contractReqJson[key].push(filterArrayResults(required, "H", 'required'));
      contractReqJson[key].push(filterArrayResults(applicable, "H", 'applicable'));
      contractReqJson[key].push(filterArrayResults(optional, "H", 'optional'));
      contractReqJson[key].push(filterArrayResults(others, "H", 'others'));

      //const contractReq = await contractReqService.ContractReqController_create(JSON.stringify(contractReqJson));
      //Refatored due to upgrade
      const contractReq = await contractReqService.ContractReqController_create(contractReqJson);

      solDapp.contractReqId = contractReq['obj'].id;
      console.log("ContractReq saved []--------------------------------------------------------");
    } catch (err) {
      error = {
        "error": {
          "code": 503,
          "message": "Contract Rquirement service not available"
        }
      };
      return error;
    }
    // let vqDummy = {};
    // vqDummy = { ...vqDummy, sol_no };
    // const vendorQAService = await getServiceConstant(process.env.VENDOR_QA_OPENAPI, 'VendorQAService');
    // const vendorQAs = [{ "vendor": "TEST Sandy Springs Bank", "question": "TEST- What technology do you use for ticketing?", "complete": "false", "response": "", "assigned": "" }
    //   , { "vendor": "TEST Sun Trust", "question": "What technology do you use for ticketing?", "complete": "false", "response": "", "assigned": "" }
    //   , { "vendor": "TEST Sun Trust", "question": "What technology do you use for ticketing?", "complete": "false", "response": "", "assigned": "" }
    //   , { "vendor": "TEST Bank of America", "question": "What technology do you use for ticketing?", "complete": "false", "response": "", "assigned": "" }
    //   , { "vendor": "TEST Wells Fargo", "question": "What technology do you use for ticketing?", "complete": "false", "response": "", "assigned": "" }
    //   , { "vendor": "TEST Wallgreens Pharmacy", "question": "What technology do you use for ticketing?", "complete": "false", "response": "", "assigned": "" }
    //   , { "vendor": "TEST Capital One", "question": "What technology do you use for ticketing?", "complete": "false", "response": "", "assigned": "" }
    //   , { "vendor": "TEST Citi Bank", "question": "What technology do you use for ticketing?", "complete": "false", "response": "", "assigned": "" }
    //   , { "vendor": "TEST Costco", "question": "What technology do you use for ticketing?", "complete": "false", "response": "", "assigned": "" }
    //   , { "vendor": "TEST CVS", "question": "What technology do you use for ticketing?", "complete": "false", "response": "", "assigned": "" }
    //   , { "vendor": "TEST Standard Chartered", "question": "What technology do you use for ticketing?", "complete": "false", "response": "", "assigned": "" }];
    // vqDummy = { ...vqDummy, vendorQAs };
    // const vendorQA = await vendorQAService.VendorQaController_create(vqDummy);
    // solDapp.vendorQaId = vendorQA['obj'].id;
    // console.log("Vendor QA saved--------------------------------------------------------");
    try {
      const proposalEvalService = await getServiceConstant(process.env.PROPOSAL_EVAL_OPENAPI, 'ProposalEvalService');

      const proposalEval = await proposalEvalService.ProposalEvalController_createWithData({});
      // const proposalEval = await proposalEvalService.ProposalEvalController_createWithDataRemote({token});

      solDapp.proposalEvalId = proposalEval['obj'].ID;
      console.log("Proposal Evaluation saved--------------------------------------------------------");

    } catch (err) {
      console.log(err);
      error = {
        "error": {
          "code": 503,
          "message": "Proposal Evaluation  service not available"
        }
      };
      return error;
    }

    try {
      const evaluatorService = await getServiceConstant(process.env.EVALUATOR_OPENAPI, 'EvaluatorService');
      const evaluator = await evaluatorService.EvaluatorController_create({});
      solDapp.evaluatorId = evaluator['obj'].ID;
      console.log("Evaluator saved--------------------------------------------------------");
    } catch (err) {
      console.log(err);
      error = {
        "error": {
          "code": 503,
          "message": "Evaluator service not available"
        }
      };
      return error;
    }

    // try {
    //   const collaboratorService = await getServiceConstant(process.env.COLLABORATOR_OPENAPI, 'CollaboratorService');
    //   const collaborator = await collaboratorService.CollaboratorController_create({});
    //   solDapp.collaboratorId = collaborator['obj'].id;
    // } catch (err) {
    //   console.log(err);
    //   error = {
    //     "error": {
    //       "code": 503,
    //       "message": "Collaborator service not available"
    //     }
    //   };
    //   return error;
    // }




    try {
      const corsService = await getServiceConstant(process.env.CORS_OPENAPI, 'CorsService');
      const cors = await corsService.CorsController_create({});
      //const cors = await corsService.CorsController_createRemote({token});
      solDapp.corsId = cors['obj'].id;
      console.log("CORS saved--------------------------------------------------------");
    } catch (err) {
      console.log(err);
      error = {
        "error": {
          "code": 503,
          "message": "CORS service not available"
        }
      };
      return error;
    }

    try {
      const socService = await getServiceConstant(process.env.SOC_OPENAPI, 'SocService');
      const soc = await socService.SocController_create({});
      solDapp.socId = soc['obj'].id;
      console.log("Soc saved--------------------------------------------------------");
    } catch (err) {
      console.log(err);
      error = {
        "error": {
          "code": 503,
          "message": "Soc service not available"
        }
      };
      return error;
    }

    return await this.solDappRepository.create(solDapp);
    // } catch (err) {
    //   console.error(err);
    //   return err;
    // }

  }








  // @post('/sol-dapp/sol/create', {
  //   responses: {
  //     '200': {
  //       description: 'Dapp model instance',
  //       content: { 'application/json': { schema: { 'x-ts-type': SolDapp } } },
  //     },
  //   },
  // })
  // async create(): Promise<SolDapp> {
  //   try {
  //     const dapp = new SolDapp();
  //     const idService = await getServiceConstant(process.env.ID_SERVICE, 'IdService');
  //     const id = await idService.IdController_genApID();
  //     dapp.ap_no = id['obj'].id;

  //     const apService = await getServiceConstant(process.env.AP_OPENAPI, 'ApService');
  //     const ap = await apService.ApController_create(JSON.stringify(dapp));
  //     dapp.apId = ap['obj'].id;

  //     const sowService = await getServiceConstant(process.env.SOW_OPENAPI, 'SowService');
  //     const sow = await sowService.SowController_create({});
  //     dapp.sowid = sow['obj'].id;

  //     const igceService = await getServiceConstant(process.env.IGCE_OPENAPI, 'IgceService');
  //     const igce = await igceService.IgceController_create({});
  //     dapp.igceId = igce['obj'].id;

  //     const evaluationCriteriaService = await getServiceConstant(process.env.EVALUATIONCRITERIA_OPENAPI, 'EvaluationCriteriaService');
  //     const evaluationCriteria = await evaluationCriteriaService.EvaluationCriteriaController_create({});
  //     dapp.evaluationCriteriaId = evaluationCriteria['obj'].id;

  //     const estimateService = await getServiceConstant(process.env.ESTIMATES_OPENAPI, 'EstimateService');
  //     const estimate = await estimateService.EstimatesController_create({});
  //     dapp.estimateId = estimate['obj'].id;

  //     const competitionService = await getServiceConstant(process.env.COMPETITION_OPENAPI, 'CompetitionService');
  //     const compotitions = await competitionService.CompetitionController_create({});
  //     dapp.competitionId = compotitions['obj'].id;

  //     const compatibilityService = await getServiceConstant(process.env.COMPATIBILITY_OPENAPI, 'CompatibilityService');
  //     const compatibility = await compatibilityService.CompatibilityController_create({});
  //     dapp.compatibilityId = compatibility['obj'].id;

  //     const tradeoffService = await getServiceConstant(process.env.TRADEOFFS_OPENAPI, 'TradeoffService');
  //     const tradeoff = await tradeoffService.TradeoffsController_create({});
  //     dapp.tradeoffId = tradeoff['obj'].id;

  //     const constraintService = await getServiceConstant(process.env.CONSTRAINTS_OPENAPI, 'ConstraintService');
  //     const constraint = await constraintService.ConstraintsController_create({});
  //     dapp.constraintId = constraint['obj'].id;

  //     const requisitionService = await getServiceConstant(process.env.REQUISITION_OPENAPI, 'RequisitionService');
  //     const requisition = await requisitionService.RequistionController_create({});
  //     dapp.requisitionId = requisition['obj'].id;

  //     const solService = await getServiceConstant(process.env.SOL_OPENAPI, 'SolService');
  //     const sol = await solService.SolController_create({});
  //     dapp.solId = sol['obj'].id;

  //     const formService = await getServiceConstant(process.env.FORM_OPENAPI, 'FormService');
  //     const form = await formService.FormController_create({});
  //     dapp.formId = form['obj'].id;

  //     const supplyService = await getServiceConstant(process.env.SUPPLY_OPENAPI, 'SupplyService');
  //     const supply = await supplyService.SupplyController_create({});
  //     dapp.supplyId = supply['obj'].id;

  //     const packagingService = await getServiceConstant(process.env.PACKAGING_OPENAPI, 'PackagingService');
  //     const packaging = await packagingService.PackagingController_create({});
  //     dapp.packagingId = packaging['obj'].id;

  //     const certService = await getServiceConstant(process.env.CERT_OPENAPI, 'CertService');
  //     const cert = await certService.CertController_create({});
  //     dapp.certId = cert['obj'].id;

  //     const instructionService = await getServiceConstant(process.env.INSTRUCTION_OPENAPI, 'InstructionService');
  //     const instruction = await instructionService.InstructionController_create({});
  //     dapp.instructionId = instruction['obj'].id;

  //     const deliveryService = await getServiceConstant(process.env.DELIVERY_OPENAPI, 'DeliveryService');
  //     const delivery = await deliveryService.DeliveryController_create({});
  //     dapp.deliveryId = delivery['obj'].id;

  //     const inspectionService = await getServiceConstant(process.env.INSPECTION_OPENAPI, 'InspectionService');
  //     const inspection = await inspectionService.InspectionController_create({});
  //     dapp.inspectionId = inspection['obj'].id;


  //     const contractAdminService = await getServiceConstant(process.env.CONTRACT_ADMIN_OPENAPI, 'ContractAdminService');
  //     const contractAdmin = await contractAdminService.ContractAdminController_create({});
  //     dapp.contractAdminId = contractAdmin['obj'].id;


  //     const contractClauseService = await getServiceConstant(process.env.CONTRACT_CLAUSE_OPENAPI, 'ContractClauseService');
  //     const contractClause= await contractClauseService.ContractClauseController_create({});
  //     dapp.contractClauseId = contractClause['obj'].id;


  //     const contractReqService = await getServiceConstant(process.env.CONTRACT_REQ_OPENAPI, 'ContractReqService');
  //     const contractReq = await contractReqService.ContractReqController_create({});
  //     dapp.contractReqId = contractReq['obj'].id;

  //     return await this.solDappRepository.create(dapp);

  //   } catch (err) {
  //     console.error(err);
  //     return err;
  //   }
  // }















  // @post('/sol-dapp', {
  //   responses: {
  //     '200': {
  //       description: 'SolDapp model instance',
  //       content: {'application/json': {schema: {'x-ts-type': SolDapp}}},
  //     },
  //   },
  // })
  // async create(@requestBody() solDapp: SolDapp): Promise<SolDapp> {
  //   return await this.solDappRepository.create(solDapp);
  // }


  @get('/acc-api/sol-dapp', {
    responses: {
      '200': {
        description: 'Array of SolDapp model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': SolDapp } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(SolDapp)) filter?: Filter<SolDapp>,
  ): Promise<SolDapp[]> {
    return await this.solDappRepository.find(filter);
  }


  @get('/acc-api/sol-dapp/{id}', {
    responses: {
      '200': {
        description: 'SolDapp model instance',
        content: { 'application/json': { schema: { 'x-ts-type': SolDapp } } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<SolDapp> {
    return await this.solDappRepository.findById(id);
  }

  @patch('/acc-api/sol-dapp/{id}', {
    responses: {
      '204': {
        description: 'SolDapp PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolDapp, { partial: true }),
        },
      },
    })
    solDapp: SolDapp,
  ): Promise<void> {
    await this.solDappRepository.updateById(id, solDapp);
  }


  // Later it has to be changed by
  @get('/acc-api/sol-dapp/sol/{sol_no}/soljson', {
    responses: {
      '200': {
        description: 'Solicitation complete JSON',
        content: { 'application/json': { schema: { 'x-ts-type': SolDapp } } },
      },
    },
  })
  async getSolJson(@param.path.string('sol_no') sol_no: string, ): Promise<{}> {
    //const token: string = jwtToken.replace(/Bearer /g,'');
    const dappResponse = await this.solDappRepository.findById(sol_no);
    console.log("dappResponse ----------------------------------------");
    console.log(dappResponse);
    const full_json: any = buildSolJSON(sol_no, dappResponse);
    return full_json
  }

  @put('/acc-api/sol-dapp/{sol_no}/publishSol', {
    responses: {
      '204': {
        description: 'Blockchain publish put success',
      },
    },
  })
  async publishSol(@param.path.string('sol_no') sol_no: string): Promise<void> {
    //const token: string = jwtToken.replace(/Bearer /g,'');
    const dappResponse = await this.solDappRepository.findById(sol_no);
    console.log("Dapp Response ------------------------------------:");
   // console.log(dappResponse);
    const full_json: any = await buildSolJSON(sol_no, dappResponse);
    // console.log("START::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::");
    // console.log("::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::");
    // console.log("::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::");
    // console.log(full_json);
    // console.log("END::::::::::::::::::::::::::::::::::::::::::::::::::");
    // console.log("::::::::::::::::::::::::::::::::::::::::::::::::::");
    // console.log("::::::::::::::::::::::::::::::::::::::::::::::::::");
    const blockchainService = await getServiceConstant(process.env.BLOCKCHAIN_OPENAPI, 'BlockChainService');
    //console.log("Going to call createAsset of BC----------------------------------------------------"+Object.keys(full_json).length);
    await blockchainService.BcController_createAsset(full_json);
  }




  @get('/acc-api/sol-dapp/{sol_no}/createAmmendment', {
    responses: {
      '204': {
        description: 'Read Sol asset from blockchain and saved in Accelerate DB successfully',
      },
    },
  })
  async createAmendment(@param.path.string('sol_no') id: string, ): Promise<AmendmentDapp> {
    //const token: string = jwtToken.replace(/Bearer /g,'');
    //console.log("Token ............"+token);
    console.log("ID ...==============================================" + id)
    let error: any = {};
    let amendDapp  = new AmendmentDapp();
    let amendment_no;

    try {
      const idService = await getServiceConstant(process.env.ID_SERVICE, 'IdService');
      const amendNum = await idService.IdController_genSolID();
      amendment_no = amendNum['obj'].id;
    } catch (err) {
      console.log(err);
      error = {
        "error": {
          "code": 503,
          "message": "Creating Amendment fail because ID or Sol service not available"
        }
      };
      return error;
    }
    
    // Add amendment_no to sol_dapp
    let solDapp  = new SolDapp();
    solDapp = await this.solDappRepository.findById(id);
    solDapp.amendment_no = amendment_no;
    amendDapp.amendment_no = amendment_no;
    amendDapp.sol_no = id;
    //await this.solDappRepository.update(solDapp);
    await this.solDappRepository.updateById(id,solDapp);

    

    console.log("createAmendment(): Going to read solicitaion asset ----------------------------------")
    let solJsonR : any;
    let solFullJson : any;
    try {
      const blockchainService = await getServiceConstant(process.env.BLOCKCHAIN_OPENAPI, 'BlockChainService');
     // console.log("BC ----------------------------------")
      //solJsonR = await blockchainService.BcController_getAsset(id);
      //console.log("solFullJson retrieved from BC====================="); 
     // console.log(solFullJson);
      //const solJsonW : any = { ...solJsonR, amendment_no };
      // console.log("amendment_no added to solFullJson to write back on BC::::::::::::::::::::::::::::::::::::::====================="); 
      // console.log(solFullJson);
      //const solJsonW : any = { ...solJsonR, amendment_no };
      // const tempJson : any = { ...solJsonR, amendment_no };
      //await blockchainService.BcController_createAsset(tempJson);
      solJsonR = await blockchainService.BcController_getAsset(id);
    // console.log("Retrieved ASSET START::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::");
    // console.log("::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::");
    // console.log("::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::");
    // console.log(solJsonR);
    // console.log("Retrieved ASSET END::::::::::::::::::::::::::::::::::::::::::::::::::");
    // console.log("::::::::::::::::::::::::::::::::::::::::::::::::::");
    // console.log("::::::::::::::::::::::::::::::::::::::::::::::::::");
    solFullJson = solJsonR['body'];
    // console.log("solFullJson Retrieved ASSET START::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::");
    // console.log("::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::");
    // console.log("::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::");
    // console.log(solFullJson);
    // console.log("solFullJson Retrieved ASSET END::::::::::::::::::::::::::::::::::::::::::::::::::");
    // console.log("::::::::::::::::::::::::::::::::::::::::::::::::::");
    // console.log("::::::::::::::::::::::::::::::::::::::::::::::::::");
    solFullJson =  { ...solFullJson, amendment_no };
    await blockchainService.BcController_createAsset(solFullJson);
      //const tempJs : any =  {"id":"24324234"};
      //const tempJs : any =  { ...solFullJson, amendment_no };
      //await blockchainService.BcController_createAsset(tempJs);
      //const blockchainServiceR = await getServiceConstant(process.env.BLOCKCHAIN_OPENAPI, 'BlockChainService');
    solFullJson = await blockchainService.BcController_getAsset(id);
      //console.log("Sol full -----------------------------")
      //console.log(solFullJson);
    } catch (err) {
      console.log(err);
      error = {
        "error": {
          "code": 503,
          "message": "Blockchain Service not available"
        }
      };
      return error;
    }
    



    const aiSvc = new AiSvc();
    let amendJson = solFullJson['body']['SOL'];
    //let amendJson = solFullJson['SOL'];
    //console.log("Amend--------------------------------------------------------");
    //console.log(amendJson);

    try {
      Object.keys(amendJson).forEach(function (key) {
        if (key === 'id') {
          delete amendJson[key];
        }
        if (key === 'contractType') {
          aiSvc.contract_type = amendJson[key];
        }
        // if (key === 'productService') {
        //   aiSvc.contract_purpose = solJson[key];
        // }

        if (key === 'productService') {
          aiSvc.categories = amendJson[key];
        }
        if (key === 'contractingmethod') {
          aiSvc.contracting_method = amendJson[key];
        }
        if (key === 'is_commercial') {
          aiSvc.is_commercial = amendJson[key];
        }
        if (key === 'estimatedBudgett') {
          aiSvc.dollar_amount = amendJson[key];
        }
        if (key === 'similarNumber') {
          const keyword = amendJson[key];
          aiSvc.key_words = typeof parseInt(keyword);
        }

        //if (key === 'Bundling') {
          // if (solJson[key] === '') {
          //   solJson[key] = false;
          //   console.log(">>>>>>>>>>>>>>>>>" + solJson[key]);
          // }
        //}

        //if (key === 'EDWOSB') {
          //console.log(">>>>>>>>>>>>>>>>>" + amendJson[key]);

        //}
        // if (amendJson[key] === '') {
        //   amendJson[key] = false;
        // }
        // if (key === 'SDVOB') {
        //   console.log(">>>>>>>>>>>>>>>>>" + amendJson[key]);
        // }

        // if (key === 'eightA') {
        //   console.log(">>>>>>>>>>>>>>>>>" + amendJson[key]);
        // }

        //if (key === 'hubzoneSB') {
         // console.log(">>>>>>>>>>>>>>>>>" + amendJson[key]);
        //}

        // if (key === 'smallBusiness') {
        //   console.log(">>>>>>>>>>>>>>>>>" + amendJson[key]);
        // }
        // if (key === 'womenSB') {
        //   console.log(">>>>>>>>>>>>>>>>>" + amendJson[key]);
        // }




      });
      console.log("Id and ap_no attributes are stripped off ________________________________________");
      //console.log(solJson);
      //let ap_no = solDapp.sol_no;

     // solJson = { ...solJson, sol_no };
     // console.log("Sol no appeded. ________________________________________");
     // console.log(solJson);
      //const apService = await getServiceConstant(process.env.AP_OPENAPI, 'ApService');
      //const ap = await apService.ApController_create(JSON.stringify(apJson));
      //solDapp.apId = ap['obj'].id;

      let isAmendment = true;
      let status = 'Amendment State'
      amendJson = { ...amendJson, amendment_no };
      amendJson = { ...amendJson, isAmendment };
      amendJson = { ...amendJson, status };
      console.log("Going to create Amendment --------------------------------------------------------");
      console.log(amendJson);
      const solService = await getServiceConstant(process.env.SOL_OPENAPI, 'SolService');
      //const amend = await solService.AmendmentController_create(amendJson);
      const amend = await solService.SolController_create(amendJson);

      amendDapp.amendmentId = amend['obj'].id;
      console.log("Amendment saved--------------------------------------------------------");

    } catch (err) {
      console.log(err);
      error = {
        "error": {
          "code": 503,
          "message": "While creating amendment Sol service is not available"
        }
      };
      return error;
    }

    let ai;
    try {
      console.log(JSON.stringify(aiSvc));
      const aiJson = await getServiceConstant(process.env.AI_SERVICE_OPENAPI, 'AIService');
      ai = await aiJson.AiController_searchClause(aiSvc);
      console.log("print AI")
      console.log("aiSvc-----------");
      if (ai['body']['statusCode'] == 400) {

        error =
        {
          "statusCode": 400,
          "message": JSON.parse(ai['body']['message'])
        };

        throw error;
      }

    } catch (err) {
      //console.log("err log -----------"+err);
      console.error('ERROR :', err);

      return err;
    }
    console.log("AI logic------------");
    // console.log(ai['body']['required']);
    const required = ai['body']['required'];
    const applicable = ai['body']['applicable'];
    const optional = ai['body']['optional'];
    const others = ai['body']['others'];
    let sop: any[] = [];
    const key = 'clause';

    //console.log("apFullJson ---------------------------------------------");
    // console.log(apFullJson);

    console.log("Good till here  -----------------------");
    const sowJson = solFullJson['body']['SOW'];
    //const sowJson = solFullJson['SOW'];
    console.log("SOW retrieved -----------------------");
    console.log(sowJson);
    try {
      Object.keys(sowJson).forEach(function (key) {
        console.log(key);
        if (key == 'id') {
          delete sowJson[key];
        }
      });
      console.log("SOW Id stripped off -----------------------");

      const sowService = await getServiceConstant(process.env.SOW_OPENAPI, 'SowService');

      // sowJson.clause = []; // empty Array, which you can push() values into
      // sowJson[key].push(filterArrayResults(required, "C", 'required'));
      // sowJson[key].push(filterArrayResults(applicable, "C", 'applicable'));
      // sowJson[key].push(filterArrayResults(optional, "C", 'optional'));
      // sowJson[key].push(filterArrayResults(others, "C", 'others'));
      console.log(sowJson);

      const sow = await sowService.SowController_create(sowJson);
      amendDapp.sowid = sow['obj'].id;
      console.log("SOW new Id assigned -----------------------");
      console.log(sowJson);
      console.log("SOW saved--------------------------------------------------------");
    } catch (err) {
      error = {
        "error": {
          "code": 503,
          "message": "SOW service not available"
        }
      };
      return error;
    }
    const evalJson = solFullJson['body']['Evaluation_Criteria'];
    //const evalJson = solFullJson['Evaluation_Criteria'];
    try {
      // console.log("Retrieved -----------------------------------------");
      console.log(evalJson);
      Object.keys(evalJson).forEach(function (key) {
        // console.log(key);
        if (key == 'id') {
          delete evalJson[key];
        }
      });

      const evalCrtService = await getServiceConstant(process.env.EVALUATIONCRITERIA_OPENAPI, 'EvalCrtService');
      // evalJson.clause = []; // empty Array, which you can push() values into
      // evalJson[key].push(filterArrayResults(required, "M", 'required'));
      // evalJson[key].push(filterArrayResults(applicable, "M", 'applicable'));
      // evalJson[key].push(filterArrayResults(optional, "M", 'optional'));
      // evalJson[key].push(filterArrayResults(others, "M", 'others'));

      const evalC = await evalCrtService.EvaluationCriteriaController_create(evalJson);

      amendDapp.evaluationCriteriaId = evalC['obj'].id;
      console.log("Eval saved--------------------------------------------------------");

    } catch (err) {
      error = {
        "error": {
          "code": 503,
          "message": "Evaluation Criteria service not available"
        }
      };
      return error;
    }
    try {
      const compatiblityJson = solFullJson['body']['Compatibility'];
      //const compatiblityJson = solFullJson['Compatibility'];
      Object.keys(compatiblityJson).forEach(function (key) {
        // console.log(key);
        if (key == 'id') {
          delete compatiblityJson[key];
        }
      });
      const compatibilityService = await getServiceConstant(process.env.COMPATIBILITY_OPENAPI, 'CompatibilityService');
      //const compatibility = await compatibilityService.CompatibilityController_create({});
      const compatibility = await compatibilityService.CompatibilityController_create(compatiblityJson);
      amendDapp.compatibilityId = compatibility['obj'].id;
      console.log("Compatibility saved--------------------------------------------------------");
    } catch (err) {
      error = {
        "error": {
          "code": 503,
          "message": "Compatibility service not available"
        }
      };
      return error;
    }

    try {
     const tradeoffsJson = solFullJson['body']['Tradeoffs'];
     //const tradeoffsJson = solFullJson['Tradeoffs'];
      Object.keys(tradeoffsJson).forEach(function (key) {
        if (key == 'id') {
          delete tradeoffsJson[key];
        }
      });
      const tradeoffService = await getServiceConstant(process.env.TRADEOFFS_OPENAPI, 'TradeoffService');
      //const tradeoff = await tradeoffService.TradeoffsController_create({});
      const tradeoff = await tradeoffService.TradeoffsController_create(tradeoffsJson);
      amendDapp.tradeoffId = tradeoff['obj'].id;
      console.log("Tradeoff saved--------------------------------------------------------");
    } catch (err) {
      error = {
        "error": {
          "code": 503,
          "message": "Tradeoff service not available"
        }
      };
      return error;
    }

    try {
      const requisitionJson = solFullJson['body']['REQUISITION'];
      Object.keys(requisitionJson).forEach(function (key) {
        if (key == 'id') {
          delete requisitionJson[key];
        }
      });
      const requisitionService = await getServiceConstant(process.env.REQUISITION_OPENAPI, 'RequisitionService');
      //const requisition = await requisitionService.RequistionController_create({});
      const requisition = await requisitionService.RequistionController_create(requisitionJson);
      amendDapp.requisitionId = requisition['obj'].id;
      console.log("Requisition saved--------------------------------------------------------");
    } catch (err) {
      error = {
        "error": {
          "code": 503,
          "message": "Requisition service not available"
        }
      };
      return error;
    }

    try {
      const formJson = solFullJson['body']['FORM'];
      Object.keys(formJson).forEach(function (key) {
        if (key == 'id') {
          delete formJson[key];
        }
      });
      const formService = await getServiceConstant(process.env.FORM_OPENAPI, 'FormService');
      // const formJson: any = {} // empty Object
      // formJson.clause = []; // empty Array, which you can push() values into
      // formJson[key].push(filterArrayResults(required, "A", 'required'));
      // formJson[key].push(filterArrayResults(applicable, "A", 'applicable'));
      // formJson[key].push(filterArrayResults(optional, "A", 'optional'));
      // formJson[key].push(filterArrayResults(others, "A", 'others'));

      const form = await formService.FormController_create(formJson);
      amendDapp.formId = form['obj'].id;
      console.log("Form saved--------------------------------------------------------");
    } catch (err) {
      error = {
        "error": {
          "code": 503,
          "message": "Form service not available"
        }
      };
      return error;
    }

    try {
      const supplyJson = solFullJson['body']['SUPPLY'];
      Object.keys(supplyJson).forEach(function (key) {
        if (key == 'id') {
          delete supplyJson[key];
        }
      });
      const supplyService = await getServiceConstant(process.env.SUPPLY_OPENAPI, 'SupplyService');
      // const supplyJson: any = {} // empty Object
      // supplyJson.clause = []; // empty Array, which you can push() values into
      // supplyJson[key].push(filterArrayResults(required, "B", 'required'));
      // supplyJson[key].push(filterArrayResults(applicable, "B", 'applicable'));
      // supplyJson[key].push(filterArrayResults(optional, "B", 'optional'));
      // supplyJson[key].push(filterArrayResults(others, "B", 'others'));


      const supply = await supplyService.SupplyController_create(supplyJson);

      amendDapp.supplyId = supply['obj'].id;
      console.log("Supply saved--------------------------------------------------------");
    } catch (err) {
      error = {
        "error": {
          "code": 503,
          "message": "SupplyService service not available"
        }
      };
      return error;
    }


    try {
      const packagingJson = solFullJson['body']['PACKAGING'];
      Object.keys(packagingJson).forEach(function (key) {
        if (key == 'id') {
          delete packagingJson[key];
        }
      });
      const packagingService = await getServiceConstant(process.env.PACKAGING_OPENAPI, 'PackagingService');
      // const packagingJson: any = {} // empty Object
      // packagingJson.clause = []; // empty Array, which you can push() values into
      // packagingJson[key].push(filterArrayResults(required, "D", 'required'));
      // packagingJson[key].push(filterArrayResults(applicable, "D", 'applicable'));
      // packagingJson[key].push(filterArrayResults(optional, "D", 'optional'));
      // packagingJson[key].push(filterArrayResults(others, "D", 'others'));

      const packaging = await packagingService.PackagingController_create(packagingJson);
      amendDapp.packagingId = packaging['obj'].id;
      console.log("Packaging saved-------------------------------------------------------- " + solDapp.packagingId);
    } catch (err) {
      error = {
        "error": {
          "code": 503,
          "message": "Packaging service not available"
        }
      };
      return error;
    }


    try {
      const certJson = solFullJson['body']['CERT'];
      Object.keys(certJson).forEach(function (key) {
        if (key == 'id') {
          delete certJson[key];
        }
      });
      const certService = await getServiceConstant(process.env.CERT_OPENAPI, 'CertService');
      // const certJson: any = {} // empty Object
      // certJson.clause = []; // empty Array, which you can push() values into
      // certJson[key].push(filterArrayResults(required, "K", 'required'));
      // certJson[key].push(filterArrayResults(applicable, "K", 'applicable'));
      // certJson[key].push(filterArrayResults(optional, "K", 'optional'));
      // certJson[key].push(filterArrayResults(others, "K", 'others'));

      const cert = await certService.CertController_create(certJson);
      amendDapp.certId = cert['obj'].id;
      console.log("CERT saved--------------------------------------------------------");
    } catch (err) {
      error = {
        "error": {
          "code": 503,
          "message": "Cert service not available"
        }
      };
      return error;
    }


    try {
      const instructionJson = solFullJson['body']['INSTRUCTION'];
      Object.keys(instructionJson).forEach(function (key) {
        if (key == 'id') {
          delete instructionJson[key];
        }
      });
      const instructionService = await getServiceConstant(process.env.INSTRUCTION_OPENAPI, 'InstructionService');

      // const instructionJson: any = {} // empty Object
      // instructionJson.clause = []; // empty Array, which you can push() values into

      // console.log(instructionJson)
      // instructionJson[key].push(filterArrayResults(required, "L", 'required'));
      // instructionJson[key].push(filterArrayResults(applicable, "L", 'applicable'));
      // instructionJson[key].push(filterArrayResults(optional, "L", 'optional'));
      // instructionJson[key].push(filterArrayResults(others, "L", 'others'));

      const instruction = await instructionService.InstructionController_create(instructionJson);
      amendDapp.instructionId = instruction['obj'].id;
      console.log("Instruction saved-------------------------------------------------------- " + solDapp.instructionId);
    } catch (err) {
      error = {
        "error": {
          "code": 503,
          "message": "Instruction service not available"
        }
      };
      return error;
    }

    try {
      const deliveryJson = solFullJson['body']['DELIVERY'];
      Object.keys(deliveryJson).forEach(function (key) {
        if (key == 'id') {
          delete deliveryJson[key];
        }
      });
      const deliveryService = await getServiceConstant(process.env.DELIVERY_OPENAPI, 'DeliveryService');
      // const deliveryJson: any = {} // empty Object
      // deliveryJson.clause = []; // empty Array, which you can push() values into
      // deliveryJson[key].push(filterArrayResults(required, "F", 'required'));
      // deliveryJson[key].push(filterArrayResults(applicable, "F", 'applicable'));
      // deliveryJson[key].push(filterArrayResults(optional, "F", 'optional'));
      // deliveryJson[key].push(filterArrayResults(others, "F", 'others'));

      const delivery = await deliveryService.DeliveryController_create(deliveryJson);
      amendDapp.deliveryId = delivery['obj'].id;
      console.log("Delivery saved--------------------------------------------------------");
    } catch (err) {
      error = {
        "error": {
          "code": 503,
          "message": "Delivery service not available"
        }
      };
      return error;
    }

    try {
      const inspectionJson = solFullJson['body']['INSPECTION'];
      Object.keys(inspectionJson).forEach(function (key) {
        if (key == 'id') {
          delete inspectionJson[key];
        }
      });
      const inspectionService = await getServiceConstant(process.env.INSPECTION_OPENAPI, 'InspectionService');
      // const inspectionJson: any = {} // empty Object
      // inspectionJson.clause = []; // empty Array, which you can push() values into
      // inspectionJson[key].push(filterArrayResults(required, "E", 'required'));
      // inspectionJson[key].push(filterArrayResults(applicable, "E", 'applicable'));
      // inspectionJson[key].push(filterArrayResults(optional, "E", 'optional'));
      // inspectionJson[key].push(filterArrayResults(others, "E", 'others'));

      const inspection = await inspectionService.InspectionController_create(inspectionJson);
      amendDapp.inspectionId = inspection['obj'].id;
      console.log("Inspection saved--------------------------------------------------------");
    } catch (err) {
      error = {
        "error": {
          "code": 503,
          "message": "Inspection service not available"
        }
      };
      return error;
    }

    try {
      
      const contractAdminJson = solFullJson['body']['CONTRACT_ADMIN'];
      Object.keys(contractAdminJson).forEach(function (key) {
        if (key == 'id') {
          delete contractAdminJson[key];
        }
      });
      const contractAdminService = await getServiceConstant(process.env.CONTRACT_ADMIN_OPENAPI, 'ContractAdminService');
      // const contractAdminJson: any = {} // empty Object
      // contractAdminJson.clause = []; // empty Array, which you can push() values into
      // contractAdminJson[key].push(filterArrayResults(required, "G", 'required'));
      // contractAdminJson[key].push(filterArrayResults(applicable, "G", 'applicable'));
      // contractAdminJson[key].push(filterArrayResults(optional, "G", 'optional'));
      // contractAdminJson[key].push(filterArrayResults(others, "G", 'others'));


      const contractAdmin = await contractAdminService.ContractAdminController_create(contractAdminJson);
      amendDapp.contractAdminId = contractAdmin['obj'].id;
      console.log("ContractAdmin saved--------------------------------------------------------");

    } catch (err) {
      error = {
        "error": {
          "code": 503,
          "message": "Contract Admin service not available"
        }
      };
      return error;
    }

    try {
      const contractClauseJson = solFullJson['body']['CONTRACT_CLAUSE'];
      Object.keys(contractClauseJson).forEach(function (key) {
        if (key == 'id') {
          delete contractClauseJson[key];
        }
      });
      const contractClauseService = await getServiceConstant(process.env.CONTRACT_CLAUSE_OPENAPI, 'ContractClauseService');
      // const contractClauseJson: any = {} // empty Object
      // contractClauseJson.clause = []; // empty Array, which you can push() values into
      // contractClauseJson[key].push(filterArrayResults(required, "I", 'required'));
      // contractClauseJson[key].push(filterArrayResults(applicable, "I", 'applicable'));
      // contractClauseJson[key].push(filterArrayResults(optional, "I", 'optional'));
      // contractClauseJson[key].push(filterArrayResults(others, "I", 'others'));
      // contractClauseJson[key].push(filterArrayResults(sop, "I", 'sop'));

      console.log("sop ========" + sop);
      console.log("contractClauseJson ======================================");
      console.log(contractClauseJson);

      const contractClause = await contractClauseService.ContractClauseController_create(contractClauseJson);
      amendDapp.contractClauseId = contractClause['obj'].id;
      console.log("ContractClause saved []--------------------------------------------------------");
    } catch (err) {
      error = {
        "error": {
          "code": 503,
          "message": "Contract Clause service not available"
        }
      };
      return error;
    }

    try {
      const contractReqJson = solFullJson['body']['CONTRACT_REQ'];
      Object.keys(contractReqJson).forEach(function (key) {
        if (key == 'id') {
          delete contractReqJson[key];
        }
      });
      const contractReqService = await getServiceConstant(process.env.CONTRACT_REQ_OPENAPI, 'ContractReqService');
      // const contractReqJson: any = {} // empty Object
      // contractReqJson.clause = []; // empty Array, which you can push() values into
      // contractReqJson[key].push(filterArrayResults(required, "H", 'required'));
      // contractReqJson[key].push(filterArrayResults(applicable, "H", 'applicable'));
      // contractReqJson[key].push(filterArrayResults(optional, "H", 'optional'));
      // contractReqJson[key].push(filterArrayResults(others, "H", 'others'));

      const contractReq = await contractReqService.ContractReqController_create(contractReqJson);

      amendDapp.contractReqId = contractReq['obj'].id;
      console.log("ContractReq saved []--------------------------------------------------------");
    } catch (err) {
      error = {
        "error": {
          "code": 503,
          "message": "Contract Rquirement service not available"
        }
      };
      return error;
    }

    try {
      // const proposalEvalJson = solFullJson['body']['PROPOSAL_EVALUATION'];
      // Object.keys(proposalEvalJson).forEach(function (key) {
      //   if (key == 'id') {
      //     delete proposalEvalJson[key];
      //   }
      // });
      const proposalEvalService = await getServiceConstant(process.env.PROPOSAL_EVAL_OPENAPI, 'ProposalEvalService');

      const proposalEval = await proposalEvalService.ProposalEvalController_createWithData({});

      amendDapp.proposalEvalId = proposalEval['obj'].ID;
      console.log("Proposal Evaluation saved--------------------------------------------------------");

    } catch (err) {
      console.log(err);
      error = {
        "error": {
          "code": 503,
          "message": "Proposal Evaluation  service not available"
        }
      };
      return error;
    }

    try {
      // const evaluatorsJson = solFullJson['body']['EVALUATORS'];
      // Object.keys(evaluatorsJson).forEach(function (key) {
      //   if (key == 'id') {
      //     delete evaluatorsJson[key];
      //   }
      // });
      const evaluatorService = await getServiceConstant(process.env.EVALUATOR_OPENAPI, 'EvaluatorService');
      const evaluator = await evaluatorService.EvaluatorController_create({});
      amendDapp.evaluatorId = evaluator['obj'].ID;
      console.log("Evaluator saved--------------------------------------------------------");
    } catch (err) {
      console.log(err);
      error = {
        "error": {
          "code": 503,
          "message": "Evaluator service not available"
        }
      };
      return error;
    }

    // try {
    //   const collaboratorsJson = solFullJson['body']['COLLABORATORS'];
    //   Object.keys(collaboratorsJson).forEach(function (key) {
    //     if (key == 'id') {
    //       delete collaboratorsJson[key];
    //     }
    //   });
    //   const collaboratorService = await getServiceConstant(process.env.COLLABORATOR_OPENAPI, 'CollaboratorService');
    //   const collaborator = await collaboratorService.CollaboratorController_create({});
    //   amendDapp.collaboratorId = collaborator['obj'].id;
    // } catch (err) {
    //   console.log(err);
    //   error = {
    //     "error": {
    //       "code": 503,
    //       "message": "Collaborator service not available"
    //     }
    //   };
    //   return error;
    // }




    try {

       const corsJson = solFullJson['body']['CORS'];
       Object.keys(corsJson).forEach(function (key) {
         if (key == 'id') {
           delete corsJson[key];
         }
       });
      const corsService = await getServiceConstant(process.env.CORS_OPENAPI, 'CorsService');
      const cors = await corsService.CorsController_create(corsJson);

      amendDapp.corsId = cors['obj'].id;
      console.log("CORS saved--------------------------------------------------------");
    } catch (err) {
      console.log(err);
      error = {
        "error": {
          "code": 503,
          "message": "CORS service not available"
        }
      };
      return error;
    }

    try {
      const socJson = solFullJson['body']['SOC'];
      Object.keys(socJson).forEach(function (key) {
        if (key == 'id') {
          delete socJson[key];
        }
      });
      const socService = await getServiceConstant(process.env.SOC_OPENAPI, 'SocService');
      const soc = await socService.SocController_create({});
      amendDapp.socId = soc['obj'].id;
      console.log("Soc saved--------------------------------------------------------");
    } catch (err) {
      console.log(err);
      error = {
        "error": {
          "code": 503,
          "message": "Soc service not available"
        }
      };
      return error;
    }


console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>"+amendDapp.amendment_no);

   //return await this.solDappRepository.create(amendDapp);
   return await this.amendmentDappRepository.create(amendDapp);

  }

  @get('/acc-api/sol-dapp/amendmentDapp/{amend_no}', {
    responses: {
      '200': {
        description: 'AmendmentDapp model instance',
        content: { 'application/json': { schema: { 'x-ts-type': AmendmentDapp } } },
      },
    },
  })
  async findAmendmentDappById(@param.path.string('amend_no') amend_no: string): Promise<AmendmentDapp> {
    return await this.amendmentDappRepository.findById(amend_no);
  }


  @put('/acc-api/sol-dapp/{amendment_no}/publishAmendment', {
    responses: {
      '204': {
        description: 'Blockchain publish put success',
      },
    },
  })
  async publishAmendment(@param.path.string('amendment_no') amendment_no: string): Promise<void> {
    //const token: string = jwtToken.replace(/Bearer /g,'');
    const dappResponse = await this.amendmentDappRepository.findById(amendment_no);
    console.log("Dapp Response ------------------------------------:");
   // console.log(dappResponse);
   // const full_json: any = await buildSolJSON(amendment_no, dappResponse);
    const full_json: any =  await buildAmendmentJSON(amendment_no, dappResponse);
    //  console.log("START::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::");
    //  console.log("::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::");
    //  console.log("::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::");
    //  console.log(full_json);
    //  console.log("END::::::::::::::::::::::::::::::::::::::::::::::::::");
    //  console.log("::::::::::::::::::::::::::::::::::::::::::::::::::");
    //  console.log("::::::::::::::::::::::::::::::::::::::::::::::::::");
    const blockchainService = await getServiceConstant(process.env.BLOCKCHAIN_OPENAPI, 'BlockChainService');
    //console.log("Going to call createAsset of BC----------------------------------------------------"+Object.keys(full_json).length);
    await blockchainService.BcController_createAsset(full_json);
  }
  // Later it has to be changed by
  @get('/acc-api/sol-dapp/{amendment_no}/amendmentJson', {
    responses: {
      '200': {
        description: 'Amendment complete JSON',
        content: { 'application/json': { schema: { 'x-ts-type': AmendmentDapp } } },
      },
    },
  })
  async getAmendmentJson(@param.path.string('amendment_no') amendment_no: string, ): Promise<{}> {
    //const token: string = jwtToken.replace(/Bearer /g,'');
    const dappResponse = await this.amendmentDappRepository.findById(amendment_no);
    console.log("dappResponse ----------------------------------------");
    console.log(dappResponse);
    const full_json: any = buildAmendmentJSON(amendment_no, dappResponse);
    return full_json
  }


}


function filterArrayResults(result: any, filterVar: string, arrayType: string) {
  let filterResult = result.filter(function (x: { ucf: string; }) { return x.ucf === filterVar });
  //console.log(result);
  // process.exit();

  const reqObj: any = {};
  if (arrayType === 'required')
    reqObj.required = [];
  if (arrayType === 'applicable')
    reqObj.applicable = [];
  if (arrayType === 'optional')
    reqObj.optional = [];
  if (arrayType === 'others') {
    reqObj.others = [];
    filterResult = result;
  } if (arrayType === 'sop')
    reqObj.sop = [];


  // console.log(filterResult);
  for (const attributename in filterResult) {
    // console.log(attributename + ": " + filterResult[attributename]);
    const arrayResult = filterResult[attributename];
    Object.keys(arrayResult).forEach(function (key) {
      if (key === "52.212-5") {
        delete arrayResult[key];
      }
    });
    reqObj[arrayType].push(arrayResult);
  }
  // jsonArray.push(arrayResult);
  // } jsonArray.push(jsn);


  // console.log(filterResult);
  return reqObj;
}

async function getServiceConstant(API_URL: any, serviceName: string) {
  const getDS = await createDataSource(API_URL, { positional: true });
  return await getDS.createModel(serviceName);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function createDataSource(spec: any, options: any) {
  const config = Object.assign(
    {
      connector: 'loopback-connector-openapi',
      spec: spec,
    },
    options,
  );
  const ds = loopback.createDataSource('openapi', config);
  // console.log(pEvent(ds, 'ECONNREFUSED'));
  await pEvent(ds, 'connected');
  return ds;
}

async function buildSolJSON(sol_no: string, dappResponse: SolDapp) {
  console.log('Start of buildApJSON');
  let full_json = {};

  full_json = { "id": sol_no };
  console.log("ID----------------");
  //console.log(full_json);
  try {
    let sol_id: String | undefined;
    let amend_id: String | undefined;
    //let ap_id: String | undefined;
    let trd_id: String | undefined;
    //let est_id: String | undefined;
    //let cmpt_id: String | undefined;
    let compat_id: String | undefined;
    //let cnstrn_id: String | undefined;
    //let igce_id: String | undefined;
    let sow_id: String | undefined;
    let evalCrt_id: String | undefined;
    let atchmnt_id: String | undefined;
    let form_id: String | undefined;
    let delivery_id: String | undefined;
    let packaging_id: String | undefined;
    let supply_id: String | undefined;
    let instruction_id: String | undefined;
    let inspection_id: String | undefined;
    let contractAdmin_id: String | undefined;
    let contractReq_id: String | undefined;
    let contractClause_id: String | undefined;
    let reqsn_id: String | undefined;
    let cert_id: String | undefined;
    let vendor_qa_id: String | undefined;
    let cors_id: String | undefined;
    let proposal_eval_id: String | undefined;
    //let collaborator_id: String | undefined;
    let evaluator_id: String | undefined;
    let soc_id: String | undefined;
    console.log("solNo ----------------------" + sol_no);
    sol_id = dappResponse.solId
    console.log("solId ----------------------" + sol_id);
    amend_id = dappResponse.amendmentId;
    //ap_id = dappResponse.apId;
    //igce_id = dappResponse.igceId;
    trd_id = dappResponse.tradeoffId;
    //est_id = dappResponse.estimateId;
    //cmpt_id = dappResponse.competitionId;
    compat_id = dappResponse.compatibilityId;
    //cnstrn_id = dappResponse.constraintId;
    sow_id = dappResponse.sowid;
    evalCrt_id = dappResponse.evaluationCriteriaId;
   // atchmnt_id = dappResponse.attachmentId;
    form_id = dappResponse.formId;
    delivery_id = dappResponse.deliveryId;
    supply_id = dappResponse.supplyId;
    packaging_id = dappResponse.packagingId;
    cert_id = dappResponse.certId;
    instruction_id = dappResponse.instructionId;
    inspection_id = dappResponse.inspectionId;
    contractAdmin_id = dappResponse.contractAdminId;
    contractReq_id = dappResponse.contractReqId;
    contractClause_id = dappResponse.contractClauseId;
    vendor_qa_id = dappResponse.vendorQaId;
    reqsn_id = dappResponse.requisitionId;
    cors_id = dappResponse.corsId;
    proposal_eval_id = dappResponse.proposalEvalId;
    //collaborator_id = dappResponse.collaboratorId;
    evaluator_id = dappResponse.evaluatorId;
    soc_id = dappResponse.socId;

    if (sol_id != undefined) {
      console.log("SOL start ...............");
      const solService = await getServiceConstant(process.env.SOL_OPENAPI, 'SolService');
      //const solResponse = await solService.SolController_find({ filter: `{"where][id":"${sol_id}"}` });
      const solResponse = await solService.SolController_find({"where":{"id":`${sol_id}`}});
      //let q   = {filter: {"where": {"id": "5f0f27cd5d3a2880f299f397"}}}
      //console.log("Query "+JSON.stringify(q));
      //const solResponse = await solService.SolController_find(q );
      const SOL = solResponse['body'][0];
      console.log("SOL----------------");
      //console.log(SOL);
      full_json = { ...full_json, SOL };
      console.log("SOL end ...............");
    }

    if (amend_id != undefined) {
      console.log("Amend start ...............");
      const solService = await getServiceConstant(process.env.SOL_OPENAPI, 'SolService');
      //const solResponse = await solService.SolController_find({ filter: `{"where][id":"${sol_id}"}` });
      const amendResponse = await solService.SolController_find({"where":{"id":`${amend_id}`}});
      //let q   = {filter: {"where": {"id": "5f0f27cd5d3a2880f299f397"}}}
      //console.log("Query "+JSON.stringify(q));
      //const solResponse = await solService.SolController_find(q );
      const AMENDMENT = amendResponse['body'][0];
      console.log("AMENDMENT----------------");
     // console.log(AMENDMENT);
      full_json = { ...full_json, AMENDMENT };
      console.log("AMENDMENT end ...............");
    }
    // if(ap_id != undefined){
    //   const apService = await getServiceConstant(process.env.AP_OPENAPI, 'ApService');
    //   const apResponse = await apService.ApController_find({ filter: `{"where][id":"${ap_id}"}` });
    //  let AP =  apResponse['body'][0];
    //  console.log("AP----------------");
    //  console.log(AP);
    //  full_json = {...full_json, AP };
    // }

    if (sow_id != undefined) {
      console.log("SOW start ...............");
      const sowService = await getServiceConstant(process.env.SOW_OPENAPI, 'SowService');
      //const sowResponse = await sowService.SowController_find({ filter: `{"where][id":"${sow_id}"}` });
      const sowResponse = await sowService.SowController_find({"where":{"id":`${sow_id}`}});
      const SOW = sowResponse['body'][0];
      console.log("SOW----------------");
      //console.log(SOW);
      full_json = { ...full_json, SOW };
      console.log("SOW end ...............");
    }

    if (evalCrt_id != undefined) {
      console.log("EVALUATION_CRITERIA start ...............");
      const evalCrtService = await getServiceConstant(process.env.EVALUATIONCRITERIA_OPENAPI, 'EvalCrtService');
      //const evalCrtResponse = await evalCrtService.EvaluationCriteriaController_find({ filter: `{"where][id":"${evalCrt_id}"}` });
      const evalCrtResponse = await evalCrtService.EvaluationCriteriaController_find({"where":{"id":`${evalCrt_id}`}});
      const Evaluation_Criteria = evalCrtResponse['body'][0];
      console.log("EVAL----------------");
     // console.log(Evaluation_Criteria);
      full_json = { ...full_json, Evaluation_Criteria };
      console.log("EVALUATION_CRITERIA end ...............");
    }

    if (atchmnt_id != undefined) {
      console.log("ATTACHMENT start ...............");
      const attachmentService = await getServiceConstant(process.env.ATTACHMENT_OPENAPI, 'AttachmentService');
      //const atchmntResponse = await attachmentService.AttachmentController_find({ filter: `{"where][id":"${atchmnt_id}"}` });
      const atchmntResponse = await attachmentService.AttachmentController_find({"where":{"id":`${atchmnt_id}`}});
      const ATTACHMENT = atchmntResponse['body'][0];
      console.log("ATTACHMENT----------------");
     // console.log(ATTACHMENT);
      full_json = { ...full_json, ATTACHMENT };
      console.log("ATTACHMENT end ...............");
    }

    // if (igce_id != undefined) {
    //   console.log("IGCE start ...............");
    //   const igceService = await getServiceConstant(process.env.IGCE_OPENAPI, 'IgceService');
    //   //const igceResponse = await igceService.IgceController_find({ filter: `{"where][id":"${igce_id}"}` });
    //   const igceResponse = await igceService.IgceController_find({"where":{"id":`${igce_id}`}});
    //   const IGCE = igceResponse['body'][0];
    //   console.log("IGCE----------------");
    //   //console.log(IGCE);
    //   full_json = { ...full_json, IGCE };
    // }

    // // Get Estimate json
    // if (est_id != undefined) {
    //   const estimateService = await getServiceConstant(process.env.ESTIMATES_OPENAPI, 'EstimateService');
    //   const estimateResponse = await estimateService.EstimatesController_find({ filter: `{"where][id":"${est_id}"}` });
    //   const ESTIMATE = estimateResponse['body'][0];
    //   console.log("ESTIMATE----------------");
    //   console.log(ESTIMATE);
    //   full_json = { ...full_json, ESTIMATE };
    // }


    // Get Tradeoffs json by trd_id
    if (trd_id != undefined) {
      console.log("TRADE_OFFS start ...............");
      const tradeoffsService = await getServiceConstant(process.env.TRADEOFFS_OPENAPI, 'TradeoffService');
      //const tradeoffsResponse = await tradeoffsService.TradeoffsController_find({ filter: `{"where][id":"${trd_id}"}` });
      const tradeoffsResponse = await tradeoffsService.TradeoffsController_find({"where":{"id":`${trd_id}`}});
      const Tradeoffs = tradeoffsResponse['body'][0];
      console.log("Tradeoffs----------------");
      //console.log(Tradeoffs);
      full_json = { ...full_json, Tradeoffs };
    }
    // // Get Competition json by cmpt_id
    // if (cmpt_id != undefined) {
    //   const competitionService = await getServiceConstant(process.env.COMPETITION_OPENAPI, 'CompetitionService');
    //   const competitionResponse = await competitionService.CompetitionController_find({ filter: `{"where][id":"${cmpt_id}"}` });
    //   const Competition = competitionResponse['body'][0];
    //   console.log("COMPETITION----------------");
    //   console.log(Competition);
    //   full_json = { ...full_json, Competition };
    // }

    // Get Compatibility json by compat_id
    if (compat_id != undefined) {
      console.log("COMPATIBILITY start ...............");
      const compatibilityService = await getServiceConstant(process.env.COMPATIBILITY_OPENAPI, 'CompatibilityService');
      //const compatibilityResponse = await compatibilityService.CompatibilityController_find({ filter: `{"where][id":"${compat_id}"}` });
      const compatibilityResponse = await compatibilityService.CompatibilityController_find({"where":{"id":`${compat_id}`}});
      const Compatibility = compatibilityResponse['body'][0];
      console.log("COMPATIBILITY----------------");
      //console.log(Compatibility);
      full_json = { ...full_json, Compatibility };
    }

    // // Get Constraints json by cnstrn_id
    // if (cnstrn_id != undefined) {
    //   const constraintService = await getServiceConstant(process.env.CONSTRAINTS_OPENAPI, 'ConstraintService');
    //   const constraintResponse = await constraintService.ConstraintsController_find({ filter: `{"where][id":"${cnstrn_id}"}` });
    //   const Constraints = constraintResponse['body'][0];
    //   console.log("CONSTRAINTS----------------");
    //   console.log(Constraints);
    //   full_json = { ...full_json, Constraints };
    // }


    // Get form json
    if (form_id != undefined) {
      console.log("FORM start ...............");
      const formService = await getServiceConstant(process.env.FORM_OPENAPI, 'FormService');
      //const formResponse = await formService.FormController_find({ filter: `{"where][id":"${form_id}"}` });
      const formResponse = await formService.FormController_find({"where":{"id":`${form_id}`}});
      const FORM = formResponse['body'][0];
      console.log("FORM----------------");
     // console.log(FORM);
      full_json = { ...full_json, FORM };
    }


    // Get Delivery json
    if (delivery_id != undefined) {
      console.log("DELIVERY start ...............");
      const deliveryService = await getServiceConstant(process.env.DELIVERY_OPENAPI, 'DeliveryService');
      //const deliveryResponse = await deliveryService.DeliveryController_find({ filter: `{"where][id":"${delivery_id}"}` });
      const deliveryResponse = await deliveryService.DeliveryController_find({"where":{"id":`${delivery_id}`}});
      const DELIVERY = deliveryResponse['body'][0];
      console.log("DELIVERY----------------");
      //console.log(DELIVERY);
      full_json = { ...full_json, DELIVERY };
    }
    // Get Packaging json
    if (packaging_id != undefined) {
      console.log("PACKAGING start ...............");
      const packagingService = await getServiceConstant(process.env.PACKAGING_OPENAPI, 'PackagingService');
      //const packagingResponse = await packagingService.PackagingController_find({ filter: `{"where][id":"${packaging_id}"}` });
      const packagingResponse = await packagingService.PackagingController_find({"where":{"id":`${packaging_id}`}});
      const PACKAGING = packagingResponse['body'][0];
      console.log("PACKAGING----------------");
      //console.log(PACKAGING);
      full_json = { ...full_json, PACKAGING };
    }

    // Get Supply json
    if (supply_id != undefined) {
      console.log("SUPPLY start ...............");
      const supplyService = await getServiceConstant(process.env.SUPPLY_OPENAPI, 'SupplyService');
      //const supplyResponse = await supplyService.SupplyController_find({ filter: `{"where][id":"${supply_id}"}` });
      const supplyResponse = await supplyService.SupplyController_find({"where":{"id":`${supply_id}`}});
      const SUPPLY = supplyResponse['body'][0];
      console.log("SUPPLY----------------");
     // console.log(SUPPLY);
      full_json = { ...full_json, SUPPLY };
    }

    // Get Instruction json
    if (instruction_id != undefined) {
      console.log("INSTRUCTION start ...............");
      const instructionService = await getServiceConstant(process.env.INSTRUCTION_OPENAPI, 'InstructionService');
      //const instructionResponse = await instructionService.InstructionController_find({ filter: `{"where][id":"${instruction_id}"}` });
      const instructionResponse = await instructionService.InstructionController_find({"where":{"id":`${instruction_id}`}});
      const INSTRUCTION = instructionResponse['body'][0];
      console.log("INSTRUCTION----------------");
      //console.log(INSTRUCTION);
      full_json = { ...full_json, INSTRUCTION };
    }

    // Get Inspection json
    if (inspection_id != undefined) {
      console.log("INSPECTION start ...............");
      const inspectionService = await getServiceConstant(process.env.INSPECTION_OPENAPI, 'InspectionService');
      //const inspectionResponse = await inspectionService.InspectionController_find({ filter: `{"where][id":"${inspection_id}"}` });
      const inspectionResponse = await inspectionService.InspectionController_find({"where":{"id":`${inspection_id}`}});
      const INSPECTION = inspectionResponse['body'][0];
      console.log("INSPECTION----------------");
      //console.log(INSPECTION);
      full_json = { ...full_json, INSPECTION };
    }


    // Get ContractAdmin json
    if (contractAdmin_id != undefined) {
      console.log("CONTRACT_ADMIN start ...............");
      const contractAdminService = await getServiceConstant(process.env.CONTRACT_ADMIN_OPENAPI, 'ContractAdminService');
      //const contractAdminResponse = await contractAdminService.ContractAdminController_find({ filter: `{"where][id":"${contractAdmin_id}"}` });
      const contractAdminResponse = await contractAdminService.ContractAdminController_find({"where":{"id":`${contractAdmin_id}`}});
      const CONTRACT_ADMIN = contractAdminResponse['body'][0];
      console.log("CONTRACT-ADMIN----------------");
      //console.log(CONTRACT_ADMIN);
      full_json = { ...full_json, CONTRACT_ADMIN };
    }

    // Get Requisition json
    if (reqsn_id != undefined) {
      console.log("REQUISITION start ...............");
      const requisitionService = await getServiceConstant(process.env.REQUISITION_OPENAPI, 'RequisitionService');
      //const requisitionResponse = await requisitionService.RequistionController_find({ filter: `{"where][id":"${reqsn_id}"}` });
      const requisitionResponse = await requisitionService.RequistionController_find({"where":{"id":`${reqsn_id}`}});
      const REQUISITION = requisitionResponse['body'][0];
      console.log("REQUISITION----------------");
      //console.log(REQUISITION);
      full_json = { ...full_json, REQUISITION };
    }

    // Get ContractReq json
    if (contractReq_id != undefined) {
      console.log("CONTRACT_REQ start ...............");
      const contractReqService = await getServiceConstant(process.env.CONTRACT_REQ_OPENAPI, 'ContractReqService');
      //const contractReqResponse = await contractReqService.ContractReqController_find({ filter: `{"where][id":"${contractReq_id}"}` });
      const contractReqResponse = await contractReqService.ContractReqController_find({"where":{"id":`${contractReq_id}`}});
      const CONTRACT_REQ = contractReqResponse['body'][0];
      console.log("CONTRACT-REQ----------------");
      //console.log(CONTRACT_REQ);
      full_json = { ...full_json, CONTRACT_REQ };
    }

    // Get ContractClause json
    if (contractClause_id != undefined) {
      console.log("CONTRACT_CLAUSE start ...............");
      const contractClauseService = await getServiceConstant(process.env.CONTRACT_CLAUSE_OPENAPI, 'ContractClauseService');
      //const contractClauseResponse = await contractClauseService.ContractClauseController_find({ filter: `{"where][id":"${contractClause_id}"}` });
      const contractClauseResponse = await contractClauseService.ContractClauseController_find({"where":{"id":`${contractClause_id}`}});
      const CONTRACT_CLAUSE = contractClauseResponse['body'][0];
      console.log("CONTRACT-CLAUSE----------------");
      //console.log(CONTRACT_CLAUSE);
      full_json = { ...full_json, CONTRACT_CLAUSE };
    }


    // Get Cert json
    if (cert_id != undefined) {
      console.log("CERT start ..............."+cert_id);
      const certService = await getServiceConstant(process.env.CERT_OPENAPI, 'CertService');
      //const certResponse = await certService.CertController_find({ filter: `{"where][id":"${cert_id}"}` });
      const certResponse = await certService.CertController_find({"where":{"id":`${cert_id}`}});
      const CERT = certResponse['body'][0];
      console.log("CERT----------------");
      //console.log(CERT);
      full_json = { ...full_json, CERT };
    }

    // Get Vendor json
    if (vendor_qa_id != undefined) {
      console.log("VENDOR_QA start ...............");
      const vendorQAService = await getServiceConstant(process.env.VENDOR_QA_OPENAPI, 'VendorQAService');
      //const vendorQAResponse = await vendorQAService.VendorQaController_find({ filter: `{"where][id":"${vendor_qa_id}"}` });
      const vendorQAResponse = await vendorQAService.VendorQaController_find({"where":{"id":`${vendor_qa_id}`}});
      const VENDOR_QA = vendorQAResponse['body'][0];
      console.log("VENDOR_QA----------------");
      //console.log(VENDOR_QA);
      full_json = { ...full_json, VENDOR_QA };
    }


    // Get ProposalEval json
    if(proposal_eval_id != undefined){
       const proposalEvalService = await getServiceConstant(process.env.PROPOSAL_EVAL_OPENAPI, 'ProposalEvalService');
       //const proposalEvalResponse = await proposalEvalService.ProposalEvalController_find({ filter: `{"where][id":"${proposal_eval_id}"}` });
       const proposalEvalResponse = await proposalEvalService.ProposalEvalController_find({"where":{"id":`${proposal_eval_id}`}});
       let PROPOSAL_EVAL =  proposalEvalResponse['body'][0];
       console.log("PROPOSAL_EVAL----------------");
       console.log(PROPOSAL_EVAL);
       full_json = {...full_json, PROPOSAL_EVAL };
     }

    // Get Evaluator json
    if(evaluator_id != undefined){
      const evaluatorService = await getServiceConstant(process.env.EVALUATOR_OPENAPI, 'EvaluatorService');
      //const proposalEvalResponse = await evaluatorService.EvaluatorController_find({ filter: `{"where][id":"${evaluator_id}"}` });
      const evaluatorResponse = await evaluatorService.EvaluatorController_find({"where":{"id":`${evaluator_id}`}});
      let EVALUATOR =  evaluatorResponse['body'][0];
      console.log("EVALUATOR----------------");
      console.log(EVALUATOR);
      full_json = {...full_json, EVALUATOR };
    }

    // if (collaborator_id != undefined) {
    //   console.log("COLLABORATOR start ..............."+collaborator_id);
    //   const collaboratorService = await getServiceConstant(process.env.COLLABORATOR_OPENAPI, 'CollaboratorService');
    //   const collaboratorResponse = await collaboratorService.CollaboratorController_find({"where":{"id":`${collaborator_id}`}});
    //   const COLLABORATORS = collaboratorResponse['body'][0];
    //   console.log("COLLABORATORS----------------");
    //   console.log(COLLABORATORS);
    //   full_json = { ...full_json, COLLABORATORS };
    // }

    // Get Cors json
    if (cors_id != undefined) {
      console.log("CORS start ...............");
      const corsService = await getServiceConstant(process.env.CORS_OPENAPI, 'CorsService');
      //const corsResponse = await corsService.CorsController_find({ filter: `{"where][id":"${cors_id}"}` });
      const corsResponse = await corsService.CorsController_find({"where":{"id":`${cors_id}`}});
      const CORS = corsResponse['body'][0];
      console.log("CORS----------------");
     // console.log(CORS);
      full_json = { ...full_json, CORS };
    }

    // Get Soc json
    if (soc_id != undefined) {
      console.log("Soc start ...............");
      const socService = await getServiceConstant(process.env.SOC_OPENAPI, 'SocService');
      const socResponse = await socService.SocController_find({"where":{"id":`${soc_id}`}});
      const SOC = socResponse['body'][0];
      console.log("SOC----------------");
      //console.log(SOC);
      full_json = { ...full_json, SOC };
    }

    //console.log("full_json....................................");
    //console.log(full_json);

  } catch (err) {
    console.error(err);
    return err;
  }
  return full_json;
}


async function buildAmendmentJSON(amendment_no: string, dappResponse: AmendmentDapp) {
  console.log('Start of buildApJSON');
  let full_json = {};

  full_json = { "id": amendment_no };
  console.log("ID----------------");
  //console.log(full_json);
  try {
    let sol_id: String | undefined;
    let amend_id: String | undefined;
    //let ap_id: String | undefined;
    let trd_id: String | undefined;
    // let est_id: String | undefined;
    // let cmpt_id: String | undefined;
    let compat_id: String | undefined;
    // let cnstrn_id: String | undefined;
    // let igce_id: String | undefined;
    let sow_id: String | undefined;
    let evalCrt_id: String | undefined;
    let atchmnt_id: String | undefined;
    let form_id: String | undefined;
    let delivery_id: String | undefined;
    let packaging_id: String | undefined;
    let supply_id: String | undefined;
    let instruction_id: String | undefined;
    let inspection_id: String | undefined;
    let contractAdmin_id: String | undefined;
    let contractReq_id: String | undefined;
    let contractClause_id: String | undefined;
    let reqsn_id: String | undefined;
    let cert_id: String | undefined;
    let vendor_qa_id: String | undefined;
    let cors_id: String | undefined;
    let proposal_eval_id: String | undefined;
    //let collaborator_id: String | undefined;
    let evaluator_id: String | undefined;
    let soc_id: String | undefined;
    console.log("amendmentNo ----------------------" + amendment_no);
    //sol_id = dappResponse.solId
    //console.log("solId ----------------------" + sol_id);
    amend_id = dappResponse.amendmentId;
    //ap_id = dappResponse.apId;
    //igce_id = dappResponse.igceId;
    trd_id = dappResponse.tradeoffId;
    //est_id = dappResponse.estimateId;
    //cmpt_id = dappResponse.competitionId;
    compat_id = dappResponse.compatibilityId;
    //cnstrn_id = dappResponse.constraintId;
    sow_id = dappResponse.sowid;
    evalCrt_id = dappResponse.evaluationCriteriaId;
   // atchmnt_id = dappResponse.attachmentId;
    form_id = dappResponse.formId;
    delivery_id = dappResponse.deliveryId;
    supply_id = dappResponse.supplyId;
    packaging_id = dappResponse.packagingId;
    cert_id = dappResponse.certId;
    instruction_id = dappResponse.instructionId;
    inspection_id = dappResponse.inspectionId;
    contractAdmin_id = dappResponse.contractAdminId;
    contractReq_id = dappResponse.contractReqId;
    contractClause_id = dappResponse.contractClauseId;
    vendor_qa_id = dappResponse.vendorQaId;
    reqsn_id = dappResponse.requisitionId;
    cors_id = dappResponse.corsId;
    proposal_eval_id = dappResponse.proposalEvalId;
    //collaborator_id = dappResponse.collaboratorId;
    evaluator_id = dappResponse.evaluatorId;
    soc_id = dappResponse.socId;

    // if (sol_id != undefined) {
    //   console.log("SOL start ...............");
    //   const solService = await getServiceConstant(process.env.SOL_OPENAPI, 'SolService');
    //   const solResponse = await solService.SolController_find({"where":{"id":`${sol_id}`}});
    //   const SOL = solResponse['body'][0];
    //   console.log("SOL----------------");
    //   full_json = { ...full_json, SOL };
    //   console.log("SOL end ...............");
    // }

    if (amend_id != undefined) {
      console.log("Amend start ...............");
      const solService = await getServiceConstant(process.env.SOL_OPENAPI, 'SolService');
      //const solResponse = await solService.SolController_find({ filter: `{"where][id":"${sol_id}"}` });
      const amendResponse = await solService.SolController_find({"where":{"id":`${amend_id}`}});
      //let q   = {filter: {"where": {"id": "5f0f27cd5d3a2880f299f397"}}}
      //console.log("Query "+JSON.stringify(q));
      //const solResponse = await solService.SolController_find(q );
      const AMENDMENT = amendResponse['body'][0];
      console.log("AMENDMENT----------------");
     // console.log(AMENDMENT);
      full_json = { ...full_json, AMENDMENT };
      console.log("AMENDMENT end ...............");
    }

    if (sow_id != undefined) {
      console.log("SOW start ...............");
      const sowService = await getServiceConstant(process.env.SOW_OPENAPI, 'SowService');
      //const sowResponse = await sowService.SowController_find({ filter: `{"where][id":"${sow_id}"}` });
      const sowResponse = await sowService.SowController_find({"where":{"id":`${sow_id}`}});
      const SOW = sowResponse['body'][0];
      console.log("SOW----------------");
      //console.log(SOW);
      full_json = { ...full_json, SOW };
      console.log("SOW end ...............");
    }

    if (evalCrt_id != undefined) {
      console.log("EVALUATION_CRITERIA start ...............");
      const evalCrtService = await getServiceConstant(process.env.EVALUATIONCRITERIA_OPENAPI, 'EvalCrtService');
      //const evalCrtResponse = await evalCrtService.EvaluationCriteriaController_find({ filter: `{"where][id":"${evalCrt_id}"}` });
      const evalCrtResponse = await evalCrtService.EvaluationCriteriaController_find({"where":{"id":`${evalCrt_id}`}});
      const Evaluation_Criteria = evalCrtResponse['body'][0];
      console.log("EVAL----------------");
     // console.log(Evaluation_Criteria);
      full_json = { ...full_json, Evaluation_Criteria };
      console.log("EVALUATION_CRITERIA end ...............");
    }

    if (atchmnt_id != undefined) {
      console.log("ATTACHMENT start ...............");
      const attachmentService = await getServiceConstant(process.env.ATTACHMENT_OPENAPI, 'AttachmentService');
      //const atchmntResponse = await attachmentService.AttachmentController_find({ filter: `{"where][id":"${atchmnt_id}"}` });
      const atchmntResponse = await attachmentService.AttachmentController_find({"where":{"id":`${atchmnt_id}`}});
      const ATTACHMENT = atchmntResponse['body'][0];
      console.log("ATTACHMENT----------------");
     // console.log(ATTACHMENT);
      full_json = { ...full_json, ATTACHMENT };
      console.log("ATTACHMENT end ...............");
    }

    // if (igce_id != undefined) {
    //   console.log("IGCE start ...............");
    //   const igceService = await getServiceConstant(process.env.IGCE_OPENAPI, 'IgceService');
    //   //const igceResponse = await igceService.IgceController_find({ filter: `{"where][id":"${igce_id}"}` });
    //   const igceResponse = await igceService.IgceController_find({"where":{"id":`${igce_id}`}});
    //   const IGCE = igceResponse['body'][0];
    //   console.log("IGCE----------------");
    //   //console.log(IGCE);
    //   full_json = { ...full_json, IGCE };
    // }

    // Get Tradeoffs json by trd_id
    if (trd_id != undefined) {
      console.log("TRADE_OFFS start ...............");
      const tradeoffsService = await getServiceConstant(process.env.TRADEOFFS_OPENAPI, 'TradeoffService');
      //const tradeoffsResponse = await tradeoffsService.TradeoffsController_find({ filter: `{"where][id":"${trd_id}"}` });
      const tradeoffsResponse = await tradeoffsService.TradeoffsController_find({"where":{"id":`${trd_id}`}});
      const Tradeoffs = tradeoffsResponse['body'][0];
      console.log("Tradeoffs----------------");
      //console.log(Tradeoffs);
      full_json = { ...full_json, Tradeoffs };
    }

    // Get Compatibility json by compat_id
    if (compat_id != undefined) {
      console.log("COMPATIBILITY start ...............");
      const compatibilityService = await getServiceConstant(process.env.COMPATIBILITY_OPENAPI, 'CompatibilityService');
      //const compatibilityResponse = await compatibilityService.CompatibilityController_find({ filter: `{"where][id":"${compat_id}"}` });
      const compatibilityResponse = await compatibilityService.CompatibilityController_find({"where":{"id":`${compat_id}`}});
      const Compatibility = compatibilityResponse['body'][0];
      console.log("COMPATIBILITY----------------");
      //console.log(Compatibility);
      full_json = { ...full_json, Compatibility };
    }



    // Get form json
    if (form_id != undefined) {
      console.log("FORM start ...............");
      const formService = await getServiceConstant(process.env.FORM_OPENAPI, 'FormService');
      //const formResponse = await formService.FormController_find({ filter: `{"where][id":"${form_id}"}` });
      const formResponse = await formService.FormController_find({"where":{"id":`${form_id}`}});
      const FORM = formResponse['body'][0];
      console.log("FORM----------------");
     // console.log(FORM);
      full_json = { ...full_json, FORM };
    }


    // Get Delivery json
    if (delivery_id != undefined) {
      console.log("DELIVERY start ...............");
      const deliveryService = await getServiceConstant(process.env.DELIVERY_OPENAPI, 'DeliveryService');
      //const deliveryResponse = await deliveryService.DeliveryController_find({ filter: `{"where][id":"${delivery_id}"}` });
      const deliveryResponse = await deliveryService.DeliveryController_find({"where":{"id":`${delivery_id}`}});
      const DELIVERY = deliveryResponse['body'][0];
      console.log("DELIVERY----------------");
      //console.log(DELIVERY);
      full_json = { ...full_json, DELIVERY };
    }
    // Get Packaging json
    if (packaging_id != undefined) {
      console.log("PACKAGING start ...............");
      const packagingService = await getServiceConstant(process.env.PACKAGING_OPENAPI, 'PackagingService');
      //const packagingResponse = await packagingService.PackagingController_find({ filter: `{"where][id":"${packaging_id}"}` });
      const packagingResponse = await packagingService.PackagingController_find({"where":{"id":`${packaging_id}`}});
      const PACKAGING = packagingResponse['body'][0];
      console.log("PACKAGING----------------");
      //console.log(PACKAGING);
      full_json = { ...full_json, PACKAGING };
    }

    // Get Supply json
    if (supply_id != undefined) {
      console.log("SUPPLY start ...............");
      const supplyService = await getServiceConstant(process.env.SUPPLY_OPENAPI, 'SupplyService');
      //const supplyResponse = await supplyService.SupplyController_find({ filter: `{"where][id":"${supply_id}"}` });
      const supplyResponse = await supplyService.SupplyController_find({"where":{"id":`${supply_id}`}});
      const SUPPLY = supplyResponse['body'][0];
      console.log("SUPPLY----------------");
     // console.log(SUPPLY);
      full_json = { ...full_json, SUPPLY };
    }

    // Get Instruction json
    if (instruction_id != undefined) {
      console.log("INSTRUCTION start ...............");
      const instructionService = await getServiceConstant(process.env.INSTRUCTION_OPENAPI, 'InstructionService');
      //const instructionResponse = await instructionService.InstructionController_find({ filter: `{"where][id":"${instruction_id}"}` });
      const instructionResponse = await instructionService.InstructionController_find({"where":{"id":`${instruction_id}`}});
      const INSTRUCTION = instructionResponse['body'][0];
      console.log("INSTRUCTION----------------");
      //console.log(INSTRUCTION);
      full_json = { ...full_json, INSTRUCTION };
    }

    // Get Inspection json
    if (inspection_id != undefined) {
      console.log("INSPECTION start ...............");
      const inspectionService = await getServiceConstant(process.env.INSPECTION_OPENAPI, 'InspectionService');
      //const inspectionResponse = await inspectionService.InspectionController_find({ filter: `{"where][id":"${inspection_id}"}` });
      const inspectionResponse = await inspectionService.InspectionController_find({"where":{"id":`${inspection_id}`}});
      const INSPECTION = inspectionResponse['body'][0];
      console.log("INSPECTION----------------");
      //console.log(INSPECTION);
      full_json = { ...full_json, INSPECTION };
    }


    // Get ContractAdmin json
    if (contractAdmin_id != undefined) {
      console.log("CONTRACT_ADMIN start ...............");
      const contractAdminService = await getServiceConstant(process.env.CONTRACT_ADMIN_OPENAPI, 'ContractAdminService');
      //const contractAdminResponse = await contractAdminService.ContractAdminController_find({ filter: `{"where][id":"${contractAdmin_id}"}` });
      const contractAdminResponse = await contractAdminService.ContractAdminController_find({"where":{"id":`${contractAdmin_id}`}});
      const CONTRACT_ADMIN = contractAdminResponse['body'][0];
      console.log("CONTRACT-ADMIN----------------");
      //console.log(CONTRACT_ADMIN);
      full_json = { ...full_json, CONTRACT_ADMIN };
    }

    // Get Requisition json
    if (reqsn_id != undefined) {
      console.log("REQUISITION start ...............");
      const requisitionService = await getServiceConstant(process.env.REQUISITION_OPENAPI, 'RequisitionService');
      //const requisitionResponse = await requisitionService.RequistionController_find({ filter: `{"where][id":"${reqsn_id}"}` });
      const requisitionResponse = await requisitionService.RequistionController_find({"where":{"id":`${reqsn_id}`}});
      const REQUISITION = requisitionResponse['body'][0];
      console.log("REQUISITION----------------");
      //console.log(REQUISITION);
      full_json = { ...full_json, REQUISITION };
    }

    // Get ContractReq json
    if (contractReq_id != undefined) {
      console.log("CONTRACT_REQ start ...............");
      const contractReqService = await getServiceConstant(process.env.CONTRACT_REQ_OPENAPI, 'ContractReqService');
      //const contractReqResponse = await contractReqService.ContractReqController_find({ filter: `{"where][id":"${contractReq_id}"}` });
      const contractReqResponse = await contractReqService.ContractReqController_find({"where":{"id":`${contractReq_id}`}});
      const CONTRACT_REQ = contractReqResponse['body'][0];
      console.log("CONTRACT-REQ----------------");
      //console.log(CONTRACT_REQ);
      full_json = { ...full_json, CONTRACT_REQ };
    }

    // Get ContractClause json
    if (contractClause_id != undefined) {
      console.log("CONTRACT_CLAUSE start ...............");
      const contractClauseService = await getServiceConstant(process.env.CONTRACT_CLAUSE_OPENAPI, 'ContractClauseService');
      //const contractClauseResponse = await contractClauseService.ContractClauseController_find({ filter: `{"where][id":"${contractClause_id}"}` });
      const contractClauseResponse = await contractClauseService.ContractClauseController_find({"where":{"id":`${contractClause_id}`}});
      const CONTRACT_CLAUSE = contractClauseResponse['body'][0];
      console.log("CONTRACT-CLAUSE----------------");
      //console.log(CONTRACT_CLAUSE);
      full_json = { ...full_json, CONTRACT_CLAUSE };
    }


    // Get Cert json
    if (cert_id != undefined) {
      console.log("CERT start ..............."+cert_id);
      const certService = await getServiceConstant(process.env.CERT_OPENAPI, 'CertService');
      //const certResponse = await certService.CertController_find({ filter: `{"where][id":"${cert_id}"}` });
      const certResponse = await certService.CertController_find({"where":{"id":`${cert_id}`}});
      const CERT = certResponse['body'][0];
      console.log("CERT----------------");
      //console.log(CERT);
      full_json = { ...full_json, CERT };
    }

    // Get Vendor json
    if (vendor_qa_id != undefined) {
      console.log("VENDOR_QA start ...............");
      const vendorQAService = await getServiceConstant(process.env.VENDOR_QA_OPENAPI, 'VendorQAService');
      //const vendorQAResponse = await vendorQAService.VendorQaController_find({ filter: `{"where][id":"${vendor_qa_id}"}` });
      const vendorQAResponse = await vendorQAService.VendorQaController_find({"where":{"id":`${vendor_qa_id}`}});
      const VENDOR_QA = vendorQAResponse['body'][0];
      console.log("VENDOR_QA----------------");
      //console.log(VENDOR_QA);
      full_json = { ...full_json, VENDOR_QA };
    }

    // Get ProposalEval json
    if(proposal_eval_id != undefined){
      const proposalEvalService = await getServiceConstant(process.env.PROPOSAL_EVAL_OPENAPI, 'ProposalEvalService');
      //const proposalEvalResponse = await proposalEvalService.ProposalEvalController_find({ filter: `{"where][id":"${proposal_eval_id}"}` });
      const proposalEvalResponse = await proposalEvalService.ProposalEvalController_find({"where":{"id":`${proposal_eval_id}`}});
      let PROPOSAL_EVAL =  proposalEvalResponse['body'][0];
      console.log("PROPOSAL_EVAL----------------");
      console.log(PROPOSAL_EVAL);
      full_json = {...full_json, PROPOSAL_EVAL };
    }

    // Get Evaluator json
    if(evaluator_id != undefined){
      const evaluatorService = await getServiceConstant(process.env.EVALUATOR_OPENAPI, 'EvaluatorService');
      //const proposalEvalResponse = await evaluatorService.EvaluatorController_find({ filter: `{"where][id":"${evaluator_id}"}` });
      const evaluatorResponse = await evaluatorService.EvaluatorController_find({"where":{"id":`${evaluator_id}`}});
      let EVALUATOR =  evaluatorResponse['body'][0];
      console.log(EVALUATOR);
      full_json = {...full_json, EVALUATOR };
    }


    // Get Cors json
    if (cors_id != undefined) {
      console.log("CORS start ...............");
      const corsService = await getServiceConstant(process.env.CORS_OPENAPI, 'CorsService');
      //const corsResponse = await corsService.CorsController_find({ filter: `{"where][id":"${cors_id}"}` });
      const corsResponse = await corsService.CorsController_find({"where":{"id":`${cors_id}`}});
      const CORS = corsResponse['body'][0];
      console.log("CORS----------------");
     // console.log(CORS);
      full_json = { ...full_json, CORS };
    }

    // Get Soc json
    if (soc_id != undefined) {
      console.log("Soc start ...............");
      const socService = await getServiceConstant(process.env.SOC_OPENAPI, 'SocService');
      const socResponse = await socService.SocController_find({"where":{"id":`${soc_id}`}});
      const SOC = socResponse['body'][0];
      console.log("SOC----------------");
      //console.log(SOC);
      full_json = { ...full_json, SOC };
    }

    //console.log("full_json....................................");
    //console.log(full_json);

  } catch (err) {
    console.error(err);
    return err;
  }
  return full_json;
}
