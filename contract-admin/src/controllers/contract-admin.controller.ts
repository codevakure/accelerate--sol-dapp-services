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
import { ContractAdmin } from '../models';
import { ContractAdminRepository } from '../repositories';

export class ContractAdminController {
  constructor(
    @repository(ContractAdminRepository)
    public contractAdminRepository: ContractAdminRepository,
  ) { }


  // Simple healthcheck function for the HTTP GET on /email-service.  The ALB is expecting a 200 for this
  @get('/acc-api/contract-admin/health', {
    responses: {
      '204': {
        description: 'Healthcheck status ok',
      },
    },
  })
  async healthCheck(): Promise<String> {
    return "status: ok";
  }

  @post('/acc-api/contract-admin', {
    responses: {
      '200': {
        description: 'ContractAdmin model instance',
        content: { 'application/json': { schema: { 'x-ts-type': ContractAdmin } } },
      },
    },
  })
  async create(@requestBody() contractAdmin: ContractAdmin): Promise<ContractAdmin> {
    return await this.contractAdminRepository.create(contractAdmin);
  }

  @get('/acc-api/contract-admin', {
    responses: {
      '200': {
        description: 'Array of ContractAdmin model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': ContractAdmin } },
          },
        },
      },
    },
  })
  async find(
   @param.query.object('filter', getFilterSchemaFor(ContractAdmin)) filter?: Filter<ContractAdmin>,
   //@param.query.object('filter') filter?: Filter,
   ): Promise<ContractAdmin[]> {
    return await this.contractAdminRepository.find(filter);
  }


  @get('/acc-api/contract-admin/{id}', {
    responses: {
      '200': {
        description: 'ContractAdmin model instance',
        content: { 'application/json': { schema: { 'x-ts-type': ContractAdmin } } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<ContractAdmin> {
    return await this.contractAdminRepository.findById(id);
  }

  @patch('/acc-api/contract-admin/{id}', {
    responses: {
      '204': {
        description: 'ContractAdmin PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ContractAdmin, { partial: true }),
        },
      },
    })
    contractAdmin: ContractAdmin,
  ): Promise<void> {
    await this.contractAdminRepository.updateById(id, contractAdmin);
  }

  @del('/acc-api/contract-admin/{id}', {
    responses: {
      '204': {
        description: 'contract-admin DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.contractAdminRepository.deleteById(id);
  }

}
