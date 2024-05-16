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
import { Form } from '../models';
import { FormRepository } from '../repositories';

export class FormController {
  constructor(
    @repository(FormRepository)
    public formRepository: FormRepository,
  ) { }

  // Simple healthcheck function for the HTTP GET on /email-service.  The ALB is expecting a 200 for this
  @get('/acc-api/form/health', {
    responses: {
      '204': {
        description: 'Healthcheck status ok',
      },
    },
  })
  async healthCheck(): Promise<String> {
    return "status: ok";
  }
  @post('/acc-api/form', {
    responses: {
      '200': {
        description: 'Form model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Form } } },
      },
    },
  })
  async create(@requestBody() form: Form): Promise<Form> {
    return await this.formRepository.create(form);
  }


  @get('/acc-api/form', {
    responses: {
      '200': {
        description: 'Array of Form model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Form } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Form)) filter?: Filter<Form>,
    //@param.query.object('filter') filter?: Filter,
  ): Promise<Form[]> {
    return await this.formRepository.find(filter);
  }


  @get('/acc-api/form/{id}', {
    responses: {
      '200': {
        description: 'Form model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Form } } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Form> {
    return await this.formRepository.findById(id);
  }

  @patch('/acc-api/form/{id}', {
    responses: {
      '204': {
        description: 'Form PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Form, { partial: true }),
        },
      },
    })
    form: Form,
  ): Promise<void> {
    await this.formRepository.updateById(id, form);
  }


  // @del('/acc-api/form/{id}', {
  //   responses: {
  //     '204': {
  //       description: 'form DELETE success',
  //     },
  //   },
  // })
  // async deleteById(@param.path.string('id') id: string): Promise<void> {
  //   await this.formRepository.deleteById(id);
  // }

}
