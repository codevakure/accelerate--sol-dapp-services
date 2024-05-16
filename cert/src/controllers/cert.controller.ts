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
import { Cert } from '../models';
import { CertRepository } from '../repositories';

export class CertController {
  constructor(
    @repository(CertRepository)
    public certRepository: CertRepository,
  ) { }


  // Simple healthcheck function for the HTTP GET on /email-service.  The ALB is expecting a 200 for this
  @get('/acc-api/cert/health', {
    responses: {
      '204': {
        description: 'Healthcheck status ok',
      },
    },
  })
  async healthCheck(): Promise<String> {
    return "status: ok";
  }

  @post('/acc-api/cert', {
    responses: {
      '200': {
        description: 'Cert model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Cert } } },
      },
    },
  })
  async create(@requestBody() cert: Cert): Promise<Cert> {
    return await this.certRepository.create(cert);
  }



  @get('/acc-api/cert', {
    responses: {
      '200': {
        description: 'Array of Cert model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Cert } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Cert)) filter?: Filter<Cert>,
    //@param.query.object('filter') filter?: Filter,
    ): Promise<Cert[]> {
    return await this.certRepository.find(filter);
  }



  @get('/acc-api/cert/{id}', {
    responses: {
      '200': {
        description: 'Cert model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Cert } } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Cert> {
    return await this.certRepository.findById(id);
  }

  @patch('/acc-api/cert/{id}', {
    responses: {
      '204': {
        description: 'Cert PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cert, { partial: true }),
        },
      },
    })
    cert: Cert,
  ): Promise<void> {
    await this.certRepository.updateById(id, cert);
  }

  @del('/acc-api/cert/{id}', {
    responses: {
      '204': {
        description: 'CERT DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.certRepository.deleteById(id);
  }

}
