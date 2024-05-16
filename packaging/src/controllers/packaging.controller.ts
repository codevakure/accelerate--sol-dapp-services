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
import { Packaging } from '../models';
import { PackagingRepository } from '../repositories';

export class PackagingController {
  constructor(
    @repository(PackagingRepository)
    public packagingRepository: PackagingRepository,
  ) { }


  // Simple healthcheck function for the HTTP GET on /email-service.  The ALB is expecting a 200 for this
  @get('/acc-api/packaging/health', {
    responses: {
      '204': {
        description: 'Healthcheck status ok',
      },
    },
  })
  async healthCheck(): Promise<String> {
    return "status: ok";
  }



  @post('/acc-api/packaging', {
    responses: {
      '200': {
        description: 'Packaging model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Packaging } } },
      },
    },
  })
  async create(@requestBody() packaging: Packaging): Promise<Packaging> {
    return await this.packagingRepository.create(packaging);
  }


  @get('/acc-api/packaging', {
    responses: {
      '200': {
        description: 'Array of Packaging model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Packaging } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Packaging)) filter?: Filter<Packaging>,
    //@param.query.object('filter') filter?: Filter,
    ): Promise<Packaging[]> {
    return await this.packagingRepository.find(filter);
  }


  @get('/acc-api/packaging/{id}', {
    responses: {
      '200': {
        description: 'Packaging model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Packaging } } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Packaging> {
    return await this.packagingRepository.findById(id);
  }

  @patch('/acc-api/packaging/{id}', {
    responses: {
      '204': {
        description: 'Packaging PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Packaging, { partial: true }),
        },
      },
    })
    packaging: Packaging,
  ): Promise<void> {
    await this.packagingRepository.updateById(id, packaging);
  }


  @del('/acc-api/packaging/{id}', {
    responses: {
      '204': {
        description: 'packaging DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.packagingRepository.deleteById(id);
  } 

}
