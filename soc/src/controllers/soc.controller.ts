import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param,


  patch, post,




  put,

  requestBody
} from '@loopback/rest';
import {Soc} from '../models';
import {SocRepository} from '../repositories';

export class SocController {
  constructor(
    @repository(SocRepository)
    public socRepository: SocRepository,
  ) {}

  // Simple healthcheck function for the HTTP GET on /email-service.  The ALB is expecting a 200 for this
  @get('/acc-api/soc/health', {
    responses: {
      '204': {
        description: 'Healthcheck status ok',
      },
    },
  })
  async healthCheck(): Promise<String> {
    return "status: ok";
  }

  @post('/acc-api/soc', {
    responses: {
      '200': {
        description: 'Soc model instance',
        content: {'application/json': {schema: getModelSchemaRef(Soc)}},
      },
    },
  })
  async create(
    @requestBody() soc: Soc,
  ): Promise<Soc> {
    return this.socRepository.create(soc);
  }




  // @get('/acc-api/soc/count', {
  //   responses: {
  //     '200': {
  //       description: 'Soc model count',
  //       content: {'application/json': {schema: CountSchema}},
  //     },
  //   },
  // })
  // async count(
  //   @param.where(Soc) where?: Where<Soc>,
  // ): Promise<Count> {
  //   return this.socRepository.count(where);
  // }

  @get('/acc-api/soc', {
    responses: {
      '200': {
        description: 'Array of Soc model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Soc, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Soc) filter?: Filter<Soc>,
  ): Promise<Soc[]> {
    return this.socRepository.find(filter);
  }

  @patch('/acc-api/soc', {
    responses: {
      '200': {
        description: 'Soc PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Soc, {partial: true}),
        },
      },
    })
    soc: Soc,
    @param.where(Soc) where?: Where<Soc>,
  ): Promise<Count> {
    return this.socRepository.updateAll(soc, where);
  }

  @get('/acc-api/soc/{id}', {
    responses: {
      '200': {
        description: 'Soc model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Soc, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Soc, {exclude: 'where'}) filter?: FilterExcludingWhere<Soc>
  ): Promise<Soc> {
    return this.socRepository.findById(id, filter);
  }

  @patch('/acc-api/soc/{id}', {
    responses: {
      '204': {
        description: 'Soc PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Soc, {partial: true}),
        },
      },
    })
    soc: Soc,
  ): Promise<void> {
    await this.socRepository.updateById(id, soc);
  }

  @put('/acc-api/soc/{id}', {
    responses: {
      '204': {
        description: 'Soc PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() soc: Soc,
  ): Promise<void> {
    await this.socRepository.replaceById(id, soc);
  }

  // @del('/acc-api/soc/{id}', {
  //   responses: {
  //     '204': {
  //       description: 'Soc DELETE success',
  //     },
  //   },
  // })
  // async deleteById(@param.path.string('id') id: string): Promise<void> {
  //   await this.socRepository.deleteById(id);
  // }
}
