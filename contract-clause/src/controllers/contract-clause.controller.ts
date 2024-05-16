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
import { ContractClause } from '../models';
import { ContractClauseRepository } from '../repositories';

export class ContractClauseController {
  constructor(
    @repository(ContractClauseRepository)
    public contractClauseRepository: ContractClauseRepository,
  ) { }


  // Simple healthcheck function for the HTTP GET on /email-service.  The ALB is expecting a 200 for this
  @get('/acc-api/contract-clause/health', {
    responses: {
      '204': {
        description: 'Healthcheck status ok',
      },
    },
  })
  async healthCheck(): Promise<String> {
    return "status: ok";
  }


  @post('/acc-api/contract-clause', {
    responses: {
      '200': {
        description: 'ContractClause model instance',
        content: { 'application/json': { schema: { 'x-ts-type': ContractClause } } },
      },
    },
  })
  async create(@requestBody() contractClause: ContractClause): Promise<ContractClause> {
    return await this.contractClauseRepository.create(contractClause);
  }


  @get('/acc-api/contract-clause', {
    responses: {
      '200': {
        description: 'Array of ContractClause model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': ContractClause } },
          },
        },
      },
    },
  })
  async find(
   @param.query.object('filter', getFilterSchemaFor(ContractClause)) filter?: Filter<ContractClause>,
   //@param.query.object('filter') filter?: Filter,
   ): Promise<ContractClause[]> {
    return await this.contractClauseRepository.find(filter);
  }


  @get('/acc-api/contract-clause/{id}', {
    responses: {
      '200': {
        description: 'ContractClause model instance',
        content: { 'application/json': { schema: { 'x-ts-type': ContractClause } } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<ContractClause> {
    return await this.contractClauseRepository.findById(id);
  }

  @patch('/acc-api/contract-clause/{id}', {
    responses: {
      '204': {
        description: 'ContractClause PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ContractClause, { partial: true }),
        },
      },
    })
    contractClause: ContractClause,
  ): Promise<void> {
    await this.contractClauseRepository.updateById(id, contractClause);
  }


  @del('/acc-api/contract-clause/{id}', {
    responses: {
      '204': {
        description: 'contract-clause DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.contractClauseRepository.deleteById(id);
  }

}
