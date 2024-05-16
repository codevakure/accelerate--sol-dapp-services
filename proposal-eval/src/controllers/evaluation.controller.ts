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
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { Evaluation } from '../models';
import { EvaluationRepository } from '../repositories';

export class EvaluationController {
  constructor(
    @repository(EvaluationRepository)
    public evaluationRepository: EvaluationRepository,
  ) { }

  @get('/acc-api/evaluation/health', {
    responses: {
      '204': {
        description: 'Healthcheck status ok',
      },
    },
  })
  async healthCheck(): Promise<String> {
    return "status: ok";
  }

  @post('/acc-api/evaluation', {
    responses: {
      '200': {
        description: 'Evaluation model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Evaluation } } },
      },
    },
  })
  async create(@requestBody() evaluation: Evaluation): Promise<Evaluation> {
    console.log("Evaluation create called -------" + JSON.stringify(evaluation));
    return await this.evaluationRepository.create(evaluation);
  }

  // @post('/acc-api/evaluation', {
  //   responses: {
  //     '200': {
  //       description: 'Evaluation model instance',
  //       content: { 'application/json': { schema: getModelSchemaRef(Evaluation) } },

  //     },
  //   },
  // })
  // async create(@requestBody({
  //   content: {
  //     'application/json': {
  //       schema: getModelSchemaRef(Evaluation, {
  //         includeRelations: false
  //       }),
  //     },
  //   },
  // }) evaluation: Evaluation): Promise<Evaluation> {
  //   console.log("Evaluation create called -------");
  //   return await this.evaluationRepository.create(evaluation);
  // }

  @get('/acc-api/evaluation', {
    responses: {
      '200': {
        description: 'Array of Evaluation model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Evaluation } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Evaluation)) filter?: Filter<Evaluation>,
  ): Promise<Evaluation[]> {
    return await this.evaluationRepository.find(filter);
  }



  @get('/acc-api/evaluation/{id}', {
    responses: {
      '200': {
        description: 'Evaluation model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Evaluation } } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Evaluation> {
    return await this.evaluationRepository.findById(id);
  }

  @patch('/acc-api/evaluation/{id}', {
    responses: {
      '204': {
        description: 'Evaluation PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() evaluation: Evaluation,
  ): Promise<void> {
    await this.evaluationRepository.updateById(id, evaluation);
  }



  @get('/acc-api/evaluation/{volumeid}/getEvaluationByVolumeId', {
    responses: {
      '200': {
        description: 'Array of Evaluation model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Evaluation } },
          },
        },
      },
    },
  })
  async getEvaluationByVolumeId(@param.path.string('volumeid') volumeid: string): Promise<Evaluation[]> {
    console.log("volumeid passed --------" + volumeid);

    const myFilter: Filter<Evaluation> = { where: { volumepkId: volumeid } };
    return await this.evaluationRepository.find(myFilter);

  }


  @get('/acc-api/evaluation/{volumeid}/getEvaluationByBlockchainIdAsVendorId', {
    responses: {
      '200': {
        description: 'Array of Evaluation model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Evaluation } },
          },
        },
      },
    },
  })
  async getEvaluationByBlockchainIdAsVendorId(@param.path.string('volumeid') volumeid: string): Promise<Evaluation[]> {
    console.log("blockchainID passed --------" + volumeid);

    const myFilter: Filter<Evaluation> = { where: { blockchainID: volumeid } };
    return await this.evaluationRepository.find(myFilter);

  }



  @del('/acc-api/evaluation/{id}', {
    responses: {
      '204': {
        description: 'evaluation DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.evaluationRepository.deleteById(id);
  }


}
