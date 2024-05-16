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
} from '@loopback/rest';
import { ContractReq } from '../models';
import { ContractReqRepository } from '../repositories';

export class ContractReqController {
  constructor(
    @repository(ContractReqRepository)
    public contractReqRepository: ContractReqRepository,
  ) { }


  // Simple healthcheck function for the HTTP GET on /email-service.  The ALB is expecting a 200 for this
  @get('/acc-api/contract-req/health', {
    responses: {
      '204': {
        description: 'Healthcheck status ok',
      },
    },
  })
  async healthCheck(): Promise<String> {
    return "status: ok";
  }


  @post('/acc-api/contract-req', {
    responses: {
      '200': {
        description: 'ContractReq model instance',
        content: { 'application/json': { schema: { 'x-ts-type': ContractReq } } },
      },
    },
  })
  async create(@requestBody() contractReq: ContractReq): Promise<ContractReq> {
    return await this.contractReqRepository.create(contractReq);
  }


  @get('/acc-api/contract-req', {
    responses: {
      '200': {
        description: 'Array of ContractReq model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': ContractReq } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(ContractReq)) filter?: Filter<ContractReq>,
    //@param.query.object('filter') filter?: Filter,
    ): Promise<ContractReq[]> {
    return await this.contractReqRepository.find(filter);
  }


  @get('/acc-api/contract-req/{id}', {
    responses: {
      '200': {
        description: 'ContractReq model instance',
        content: { 'application/json': { schema: { 'x-ts-type': ContractReq } } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<ContractReq> {
    return await this.contractReqRepository.findById(id);
  }

  @patch('/acc-api/contract-req/{id}', {
    responses: {
      '204': {
        description: 'ContractReq PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ContractReq, { partial: true }),
        },
      },
    })
    contractReq: ContractReq,
  ): Promise<void> {
    await this.contractReqRepository.updateById(id, contractReq);
  }


  @del('/acc-api/contract-req/{id}', {
    responses: {
      '204': {
        description: 'contract-req DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.contractReqRepository.deleteById(id);
  }  

}
