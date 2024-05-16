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
import { Evaluator } from '../models';
import { EvaluatorRepository } from '../repositories';

export class EvaluatorController {
  constructor(
    @repository(EvaluatorRepository)
    public evaluatorRepository: EvaluatorRepository,
  ) { }


  
  // Simple healthcheck function for the HTTP GET on /email-service.  The ALB is expecting a 200 for this
  @get('/acc-api/evaluator/health', {
    responses: {
      '204': {
        description: 'Healthcheck status ok',
      },
    },
  })
  async healthCheck(): Promise<String> {
    return "status: ok";
  }

  @post('/acc-api/evaluator', {
    responses: {
      '200': {
        description: 'Evaluator model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Evaluator) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Evaluator, { exclude: ['ID'] }),
        },
      },
    })
    evaluator: Omit<Evaluator, 'ID'>,
  ): Promise<Evaluator> {
    return this.evaluatorRepository.create(evaluator);
  }



  @get('/acc-api/evaluator', {
    responses: {
      '200': {
        description: 'Array of Evaluator model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Evaluator) },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Evaluator)) filter?: Filter<Evaluator>,
    //@param.query.object('filter') filter?: Filter,
    ): Promise<Evaluator[]> {
    return this.evaluatorRepository.find(filter);
  }

  @get('/acc-api/evaluator/{id}', {
    responses: {
      '200': {
        description: 'Evaluator model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Evaluator) } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Evaluator> {
    return this.evaluatorRepository.findById(id);
  }

  @patch('/acc-api/evaluator/{id}', {
    responses: {
      '204': {
        description: 'Evaluator PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Evaluator, { partial: true }),
        },
      },
    })
    evaluator: Evaluator,
  ): Promise<void> {
    await this.evaluatorRepository.updateById(id, evaluator);
  }


  @del('/acc-api/evaluator/{id}', {
    responses: {
      '204': {
        description: 'evaluator DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.evaluatorRepository.deleteById(id);
  }  

}
