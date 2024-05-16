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
import { VendorFiles } from '../models';
import { VendorFilesRepository } from '../repositories';

export class VendorFilesController {
  constructor(
    @repository(VendorFilesRepository)
    public vendorFilesRepository: VendorFilesRepository,
  ) { }

  @post('/acc-api/vendor-files', {
    responses: {
      '200': {
        description: 'VendorFiles model instance',
        content: { 'application/json': { schema: { 'x-ts-type': VendorFiles } } },
      },
    },
  })
  async create(@requestBody() vendorFiles: VendorFiles): Promise<VendorFiles> {
    return await this.vendorFilesRepository.create(vendorFiles);
  }

  @get('/acc-api/vendor-files/count', {
    responses: {
      '200': {
        description: 'VendorFiles model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(VendorFiles)) where?: Where<VendorFiles>,
  ): Promise<Count> {
    return await this.vendorFilesRepository.count(where);
  }

  @get('/acc-api/vendor-files', {
    responses: {
      '200': {
        description: 'Array of VendorFiles model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': VendorFiles } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(VendorFiles)) filter?: Filter<VendorFiles>,
  ): Promise<VendorFiles[]> {
    return await this.vendorFilesRepository.find(filter);
  }

  @patch('/acc-api/vendor-files', {
    responses: {
      '200': {
        description: 'VendorFiles PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() vendorFiles: VendorFiles,
    @param.query.object('where', getWhereSchemaFor(VendorFiles)) where?: Where<VendorFiles>,
  ): Promise<Count> {
    return await this.vendorFilesRepository.updateAll(vendorFiles, where);
  }

  @get('/acc-api/vendor-files/{id}', {
    responses: {
      '200': {
        description: 'VendorFiles model instance',
        content: { 'application/json': { schema: { 'x-ts-type': VendorFiles } } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<VendorFiles> {
    return await this.vendorFilesRepository.findById(id);
  }

  @patch('/acc-api/vendor-files/{id}', {
    responses: {
      '204': {
        description: 'VendorFiles PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() vendorFiles: VendorFiles,
  ): Promise<void> {
    await this.vendorFilesRepository.updateById(id, vendorFiles);
  }

  @put('/acc-api/vendor-files/{id}', {
    responses: {
      '204': {
        description: 'VendorFiles PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() vendorFiles: VendorFiles,
  ): Promise<void> {
    await this.vendorFilesRepository.replaceById(id, vendorFiles);
  }

  @del('/acc-api/vendor-files/{id}', {
    responses: {
      '204': {
        description: 'VendorFiles DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.vendorFilesRepository.deleteById(id);
  }
}
