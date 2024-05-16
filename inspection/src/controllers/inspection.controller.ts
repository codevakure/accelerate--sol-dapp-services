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
import { Inspection } from '../models';
import { InspectionRepository } from '../repositories';

export class InspectionController {
  constructor(
    @repository(InspectionRepository)
    public inspectionRepository: InspectionRepository,
  ) { }


  // Simple healthcheck function for the HTTP GET on /email-service.  The ALB is expecting a 200 for this
  @get('/acc-api/inspection/health', {
    responses: {
      '204': {
        description: 'Healthcheck status ok',
      },
    },
  })
  async healthCheck(): Promise<String> {
    return "status: ok";
  }


  @post('/acc-api/inspection', {
    responses: {
      '200': {
        description: 'Inspection model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Inspection } } },
      },
    },
  })
  async create(@requestBody() inspection: Inspection): Promise<Inspection> {
    return await this.inspectionRepository.create(inspection);
  }


  @get('/acc-api/inspection', {
    responses: {
      '200': {
        description: 'Array of Inspection model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Inspection } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Inspection)) filter?: Filter<Inspection>,
    //@param.query.object('filter') filter?: Filter,
    ): Promise<Inspection[]> {
    return await this.inspectionRepository.find(filter);
  }


  @get('/acc-api/inspection/{id}', {
    responses: {
      '200': {
        description: 'Inspection model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Inspection } } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Inspection> {
    return await this.inspectionRepository.findById(id);
  }

  @patch('/acc-api/inspection/{id}', {
    responses: {
      '204': {
        description: 'Inspection PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inspection, { partial: true }),
        },
      },
    })
    inspection: Inspection,
  ): Promise<void> {
    await this.inspectionRepository.updateById(id, inspection);
  }


  @del('/acc-api/inspection/{id}', {
    responses: {
      '204': {
        description: 'inspection DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.inspectionRepository.deleteById(id);
  }  

}
