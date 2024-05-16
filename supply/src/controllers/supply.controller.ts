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
import { Supply } from '../models';
import { SupplyRepository } from '../repositories';

export class SupplyController {
  constructor(
    @repository(SupplyRepository)
    public supplyRepository: SupplyRepository,
  ) { }

  // Simple healthcheck function for the HTTP GET on /email-service.  The ALB is expecting a 200 for this
  @get('/acc-api/supply/health', {
    responses: {
      '204': {
        description: 'Healthcheck status ok',
      },
    },
  })
  async healthCheck(): Promise<String> {
    return "status: ok";
  }

  @post('/acc-api/supply', {
    responses: {
      '200': {
        description: 'Supply model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Supply } } },
      },
    },
  })
  async create(@requestBody() supply: Supply): Promise<Supply> {
    return await this.supplyRepository.create(supply);
  }



  @get('/acc-api/supply', {
    responses: {
      '200': {
        description: 'Array of Supply model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Supply } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Supply)) filter?: Filter<Supply>,
    //@param.query.object('filter') filter?: Filter,
    ): Promise<Supply[]> {
    return await this.supplyRepository.find(filter);
  }



  @get('/acc-api/supply/{id}', {
    responses: {
      '200': {
        description: 'Supply model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Supply } } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Supply> {
    return await this.supplyRepository.findById(id);
  }

  @patch('/acc-api/supply/{id}', {
    responses: {
      '204': {
        description: 'Supply PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Supply, { partial: true }),
        },
      },
    })
    supply: Supply,
  ): Promise<void> {
    await this.supplyRepository.updateById(id, supply);
  }



  @del('/acc-api/supply/{id}', {
    responses: {
      '204': {
        description: 'supply DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.supplyRepository.deleteById(id);
  } 

}
