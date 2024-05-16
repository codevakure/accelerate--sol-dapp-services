/* eslint-disable @typescript-eslint/prefer-for-of */
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
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { ProposalEval, Evaluation, VendorFiles, SupportedFiles } from '../models';
import { ProposalEvalRepository, EvaluationRepository } from '../repositories';


const loopback = require("loopback");
const pEvent = require('p-event');

export class ProposalEvalController {
  constructor(
    @repository(ProposalEvalRepository) public proposalEvalRepository: ProposalEvalRepository,
    @repository(EvaluationRepository) public evaluationRepository: EvaluationRepository,
  ) { }

  // Simple healthcheck function for the HTTP GET on /email-service.  The ALB is expecting a 200 for this
  @get('/acc-api/proposal-eval/health', {
    responses: {
      '204': {
        description: 'Healthcheck status ok',
      },
    },
  })
  async healthCheck(): Promise<String> {
    return "status: ok";
  }


  @post('/acc-api/proposal-eval', {
    responses: {
      '200': {
        description: 'ProposalEval model instance',
        content: { 'application/json': { schema: { 'x-ts-type': ProposalEval } } },
      },
    },
  })
  async create(@requestBody() proposalEval: ProposalEval): Promise<ProposalEval> {
    return await this.proposalEvalRepository.create(proposalEval);
  }

  @get('/acc-api/proposal-eval/count', {
    responses: {
      '200': {
        description: 'ProposalEval model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(ProposalEval)) where?: Where<ProposalEval>,
  ): Promise<Count> {
    return await this.proposalEvalRepository.count(where);
  }

  @get('/acc-api/proposal-eval/{sol_no}/getProposalEvalByVendorIdAsSolNo', {
    responses: {
      '200': {
        description: 'Array of Proposal-Eval model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': ProposalEval } },
          },
        },
      },
    },
  })
  async getProposalEvalByVendorIdAsSolNo(@param.path.string('sol_no') sol_no: string): Promise<ProposalEval[]> {
    console.log("sol_no passed --------" + sol_no);

    const myFilter: Filter<ProposalEval> = { where: { vendorId: sol_no } };
    return await this.proposalEvalRepository.find(myFilter);

  }

  @get('/acc-api/proposal-eval/{sol_no}/getProposalEvalBySolNo', {
    responses: {
      '200': {
        description: 'Array of Proposal-Eval model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': ProposalEval } },
          },
        },
      },
    },
  })
  async getProposalEvalBySolNo(@param.path.string('sol_no') sol_no: string): Promise<ProposalEval[]> {
    console.log("sol_no passed --------" + sol_no);

    const myFilter: Filter<ProposalEval> = { where: { sol_no: sol_no } };
    return await this.proposalEvalRepository.find(myFilter);

  }


  @get('/acc-api/proposal-eval/fulljson/{id}', {
    responses: {
      '200': {
        description: 'Array of ProposalEval model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': ProposalEval } },
          },
        },
      },
    },
  })
  async findByIDGetFullJson(@param.path.string('id') id: string, ): Promise<ProposalEval> {
    //const token: string = jwtToken.replace(/Bearer /g,'');
    const propsalEvalResponse = await this.proposalEvalRepository.findById(id);
    // console.log(propsalEvalResponse);
    // const propsalEval = this.proposalEvalRepository.find(filter);
    const proposalEvaluation: any = buildFullJSON(propsalEvalResponse);

    // console.log(this.evaluationRepository.findById("5d6aa933af175a2f903d994a"));
    return proposalEvaluation;
  }



  @get('/acc-api/proposal-eval', {
    responses: {
      '200': {
        description: 'Array of ProposalEval model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': ProposalEval } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(ProposalEval)) filter?: Filter<ProposalEval>,
  ): Promise<ProposalEval[]> {

    const propsalEval = this.proposalEvalRepository.find(filter);
    // let full_json = {};

    // // console.log(propsalEval);
    // propsalEval.then(async function (result) {
    //   // console.log(result);
    //   const s = JSON.stringify(result);
    //   const j = JSON.parse(s);
    //   // console.log(j);

    //   const keysArray = Object.keys(j);

    //   for (let i = 0; i < keysArray.length; i++) {
    //     const key = keysArray[i]; // here is "name" of object property
    //     const value = j[key]; // here get value "by name" as it expected with objects
    //     // console.log(key, value);
    //     // console.log(value.ID);
    //     // console.log(value.evaluation);
    //     full_json = { "ID": value.ID };
    //     const evalArray = value.evaluation;
    //     // console.log(ProposalEvalController.evaluationRepository.findById("5d6aa933af175a2f903d994a"));

    //     for (let k = 0, len: number = evalArray.length; k < len; k++) {
    //       // console.log("eval id: " + evalArray[k]);

    //       const evalService = await getServiceConstant("http://localhost:6027/acc-api/proposal-eval-openapi.json", 'EvaluationService');
    //       const evalResponse = await evalService.EvaluationController_find({ filter: `{"where][ID":"${evalArray[k]}"}` });
    //       const evaluation = evalResponse['body'][0];

    //       // console.log(evalResponse);
    //       console.log(evaluation);
    //       full_json = { ...full_json, evaluation };

    //     }
    //   }
    // })
    // console.log(this.evaluationRepository.findById("5d6aa933af175a2f903d994a"));
    return await propsalEval;
  }



  @patch('/acc-api/proposal-eval', {
    responses: {
      '200': {
        description: 'ProposalEval PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() proposalEval: ProposalEval,
    @param.query.object('where', getWhereSchemaFor(ProposalEval)) where?: Where<ProposalEval>,
  ): Promise<Count> {
    return await this.proposalEvalRepository.updateAll(proposalEval, where);
  }

  @get('/acc-api/proposal-eval/{id}', {
    responses: {
      '200': {
        description: 'ProposalEval model instance',
        content: { 'application/json': { schema: { 'x-ts-type': ProposalEval } } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<ProposalEval> {
    return await this.proposalEvalRepository.findById(id);
  }

  @patch('/acc-api/proposal-eval/{id}', {
    responses: {
      '204': {
        description: 'ProposalEval PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() proposalEval: ProposalEval,
  ): Promise<void> {
    await this.proposalEvalRepository.updateById(id, proposalEval);
  }

  @put('/acc-api/proposal-eval/{id}', {
    responses: {
      '204': {
        description: 'ProposalEval PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() proposalEval: ProposalEval,
  ): Promise<void> {
    await this.proposalEvalRepository.replaceById(id, proposalEval);
  }

  @del('/acc-api/proposal-eval/{id}', {
    responses: {
      '204': {
        description: 'ProposalEval DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.proposalEvalRepository.deleteById(id);
  }

  @post('/acc-api/proposal-eval/{token}/createWithDataRemote', {
    responses: {
      '200': {
        description: 'ProposalEval create data',
        content: { 'application/json': { schema: { 'x-ts-type': ProposalEval } } },
      },
    },
  })
  async createWithDataRemote(@requestBody() proposalEval: ProposalEval, @param.path.string('token') token: string, ): Promise<ProposalEval> {

    const evaluation = new Evaluation();
    evaluation.vendor = "Apple";

    const sfArry: any = [{
      "ID": "5d6cb78bfa379a57182e5693",
      "fileName": "Solicitation",
      "pdfSrc": "https://acclerate-attachments.s3.amazonaws.com/sample-proposal-eval.pdf"
    },
    {
      "ID": "5d6cb798fa379a57182e5694",
      "fileName": "Evaluation Criteria",
      "pdfSrc": "https://acclerate-attachments.s3.amazonaws.com/sample-proposal-eval.pdf"
    },
    {
      "ID": "5d6cb7abfa379a57182e5695",
      "fileName": "Scoring Guidelines",
      "pdfSrc": "https://acclerate-attachments.s3.amazonaws.com/sample-proposal-eval.pdf"
    },
    {
      "ID": "5d6cb7b8fa379a57182e5696",
      "fileName": "Proposal Instructions",
      "pdfSrc": "https://acclerate-attachments.s3.amazonaws.com/sample-proposal-eval.pdf"
    }];

    const venArray: any = [{
      "ID": "5d6cb70dfa379a57182e568e",
      "volumeName": "Past Performance",
      "pdfSrc": "https://acclerate-attachments.s3.amazonaws.com/sample-proposal-eval.pdf"
    },
    {
      "ID": "5d6cb736fa379a57182e568f",
      "volumeName": "Pricing",
      "pdfSrc": "https://acclerate-attachments.s3.amazonaws.com/sample-proposal-eval.pdf"
    },
    {
      "ID": "5d6cb73ffa379a57182e5690",
      "volumeName": "Technical",
      "pdfSrc": "https://acclerate-attachments.s3.amazonaws.com/sample-proposal-eval.pdf"
    },
    {
      "ID": "5d6cb74afa379a57182e5691",
      "volumeName": "Technical Architecture Diagram",
      "pdfSrc": "https://acclerate-attachments.s3.amazonaws.com/sample-proposal-eval.pdf"
    },
    {
      "ID": "5d6cb756fa379a57182e5692",
      "volumeName": "Key Personnel Template",
      "pdfSrc": "https://acclerate-attachments.s3.amazonaws.com/sample-proposal-eval.pdf"
    }];

    evaluation.vendorFiles = venArray;

    evaluation.supportedFiles = sfArry;

    const evalData: any = [];

    const arry = ['Sun Trust', 'Dell', 'Google', 'Aurotech', 'Citibank'];
    for (let i = 0; i < arry.length; i++) {
      const evalService = await getServiceConstant(process.env.PROPOSAL_EVAL_OPENAPI, 'EvaluationService');
      const evalCreate = await evalService.EvaluationController_create(JSON.stringify(evaluation));
      console.log(arry[i]);
      evaluation.vendor = arry[i];
      console.log(evalCreate['obj'].ID);

      evalData.push(evalCreate['obj'].ID);

    }




    proposalEval = new ProposalEval();

    console.log(evalData);

    proposalEval.evaluation = evalData;
    console.log(proposalEval);


    return await this.proposalEvalRepository.create(proposalEval);
  }


  @post('/acc-api/proposal-eval/create', {
    responses: {
      '200': {
        description: 'ProposalEval create data',
        content: { 'application/json': { schema: { 'x-ts-type': ProposalEval } } },
      },
    },
  })
  async createWithData(@requestBody() proposalEval: ProposalEval, ): Promise<ProposalEval> {
    console.log("CreateWithData called..................");


    const evaluation = new Evaluation();
    evaluation.vendor = "Apple";

    const sfArry: any = [{
      "ID": "5d6cb78bfa379a57182e5693",
      "fileName": "Solicitation",
      "pdfSrc": "https://acclerate-attachments.s3.amazonaws.com/sample-proposal-eval.pdf"
    },
    {
      "ID": "5d6cb798fa379a57182e5694",
      "fileName": "Evaluation Criteria",
      "pdfSrc": "https://acclerate-attachments.s3.amazonaws.com/sample-proposal-eval.pdf"
    },
    {
      "ID": "5d6cb7abfa379a57182e5695",
      "fileName": "Scoring Guidelines",
      "pdfSrc": "https://acclerate-attachments.s3.amazonaws.com/sample-proposal-eval.pdf"
    },
    {
      "ID": "5d6cb7b8fa379a57182e5696",
      "fileName": "Proposal Instructions",
      "pdfSrc": "https://acclerate-attachments.s3.amazonaws.com/sample-proposal-eval.pdf"
    }];

    const venArray: any = [{
      "ID": "5d6cb70dfa379a57182e568e",
      "volumeName": "Past Performance",
      "pdfSrc": "https://acclerate-attachments.s3.amazonaws.com/sample-proposal-eval.pdf"
    },
    {
      "ID": "5d6cb736fa379a57182e568f",
      "volumeName": "Pricing",
      "pdfSrc": "https://acclerate-attachments.s3.amazonaws.com/sample-proposal-eval.pdf"
    },
    {
      "ID": "5d6cb73ffa379a57182e5690",
      "volumeName": "Technical",
      "pdfSrc": "https://acclerate-attachments.s3.amazonaws.com/sample-proposal-eval.pdf"
    },
    {
      "ID": "5d6cb74afa379a57182e5691",
      "volumeName": "Technical Architecture Diagram",
      "pdfSrc": "https://acclerate-attachments.s3.amazonaws.com/sample-proposal-eval.pdf"
    },
    {
      "ID": "5d6cb756fa379a57182e5692",
      "volumeName": "Key Personnel Template",
      "pdfSrc": "https://acclerate-attachments.s3.amazonaws.com/sample-proposal-eval.pdf"
    }];

    evaluation.vendorFiles = venArray;
    // console.log(sfCreate);

    evaluation.supportedFiles = sfArry;

    const evalData: any = [];

    const arry = ['Sun Trust', 'Dell', 'Google', 'Aurotech', 'Citibank'];
    for (let i = 0; i < arry.length; i++) {
      const evalService = await getServiceConstant(process.env.PROPOSAL_EVAL_OPENAPI, 'EvaluationService');
      //    const evalCreate = await evalService.EvaluationController_create(JSON.stringify(evaluation));
      const evalCreate = await evalService.EvaluationController_create(evaluation);
      console.log(arry[i]);
      evaluation.vendor = arry[i];
      console.log(evalCreate['obj'].ID);

      evalData.push(evalCreate['obj'].ID);

    }



    // const evalData: any = [
    //   "5d6ca3be1c97032950b8c959",
    //   '5d6b1b6a76790425b8d24993',
    //   '5d6b1b7776790425b8d24994',
    //   '5d6b1b8176790425b8d24995'
    // ];
    // evalData.push(evalCreate['obj'].ID);
    proposalEval = new ProposalEval();

    console.log(evalData);

    proposalEval.evaluation = evalData;
    console.log(proposalEval);


    return await this.proposalEvalRepository.create(proposalEval);
  }
}




async function buildFullJSON(proposalEval: ProposalEval) {
  console.log("Entered in buildFullJSON===============");
  let proposalEvaluation = {};

  // let evalArray = Object[] | undefined;

  // console.log(proposalEval);
  // console.log(proposalEval.ID);
  // console.log(proposalEval.evaluation);

  // proposalEvaluation = { "id": proposalEval.ID };

  const evalArray: object[] | undefined = proposalEval.evaluation;
  let arry = [];
  arry.push(proposalEval.ID);

  if (evalArray !== undefined) {
    for (let k = 0, len: number = evalArray.length; k < len; k++) {
      // console.log(this.evaluationRepository.findById("5d6aa933af175a2f903d994a"));
      // console.log(evalArray[k]);


      const evalService = await getServiceConstant(process.env.PROPOSAL_EVAL_OPENAPI, 'EvaluationService');
      //const evalResponse = await evalService.EvaluationController_find({ filter: `{"where][ID":"${evalArray[k]}"}` });
      const evalResponse = await evalService.EvaluationController_find({"where":{"ID":`${evalArray[k]}`}});
      const evaluation = evalResponse['body'][0];

      // console.log(full_json);
      // proposalEvaluation = { proposalEvaluation, evaluation };
      // console.log(proposalEvaluation);
      proposalEvaluation = { ...proposalEvaluation, evaluation };
      arry.push(proposalEvaluation)
    }
  }

  return arry;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getServiceConstant(API_URL: any, serviceName: string) {
  const getDS = await createDataSource(API_URL, { positional: true });
  // console.log(getDS);
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
