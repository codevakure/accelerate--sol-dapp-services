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
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { SupportedFiles } from '../models';
import { SupportedFilesRepository } from '../repositories';

export class SupportedFilesController {
  constructor(
    @repository(SupportedFilesRepository)
    public supportedFilesRepository: SupportedFilesRepository,
  ) { }

  @post('/acc-api/supported-files', {
    responses: {
      '200': {
        description: 'SupportedFiles model instance',
        content: { 'application/json': { schema: { 'x-ts-type': SupportedFiles } } },
      },
    },
  })
  async create(@requestBody() supportedFiles: SupportedFiles): Promise<SupportedFiles> {
    return await this.supportedFilesRepository.create(supportedFiles);
  }

  @get('/acc-api/supported-files/count', {
    responses: {
      '200': {
        description: 'SupportedFiles model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(SupportedFiles)) where?: Where<SupportedFiles>,
  ): Promise<Count> {
    return await this.supportedFilesRepository.count(where);
  }

  @get('/acc-api/supported-files', {
    responses: {
      '200': {
        description: 'Array of SupportedFiles model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': SupportedFiles } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(SupportedFiles)) filter?: Filter<SupportedFiles>,
  ): Promise<SupportedFiles[]> {
    return await this.supportedFilesRepository.find(filter);
  }

  @patch('/acc-api/supported-files', {
    responses: {
      '200': {
        description: 'SupportedFiles PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() supportedFiles: SupportedFiles,
    @param.query.object('where', getWhereSchemaFor(SupportedFiles)) where?: Where<SupportedFiles>,
  ): Promise<Count> {
    return await this.supportedFilesRepository.updateAll(supportedFiles, where);
  }

  @get('/acc-api/supported-files/{id}', {
    responses: {
      '200': {
        description: 'SupportedFiles model instance',
        content: { 'application/json': { schema: { 'x-ts-type': SupportedFiles } } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<SupportedFiles> {
    return await this.supportedFilesRepository.findById(id);
  }

  @patch('/acc-api/supported-files/{id}', {
    responses: {
      '204': {
        description: 'SupportedFiles PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() supportedFiles: SupportedFiles,
  ): Promise<void> {
    await this.supportedFilesRepository.updateById(id, supportedFiles);
  }

  @put('/acc-api/supported-files/{id}', {
    responses: {
      '204': {
        description: 'SupportedFiles PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() supportedFiles: SupportedFiles,
  ): Promise<void> {
    await this.supportedFilesRepository.replaceById(id, supportedFiles);
  }

  @del('/acc-api/supported-files/{id}', {
    responses: {
      '204': {
        description: 'SupportedFiles DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.supportedFilesRepository.deleteById(id);
  }
}
