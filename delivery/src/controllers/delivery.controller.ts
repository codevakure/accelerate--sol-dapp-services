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
import { Delivery } from '../models';
import { DeliveryRepository } from '../repositories';

export class DeliveryController {
  constructor(
    @repository(DeliveryRepository)
    public deliveryRepository: DeliveryRepository,
  ) { }

  // Simple healthcheck function for the HTTP GET on /email-service.  The ALB is expecting a 200 for this
  @get('/acc-api/delivery/health', {
    responses: {
      '204': {
        description: 'Healthcheck status ok',
      },
    },
  })
  async healthCheck(): Promise<String> {
    return "status: ok";
  }

  @post('/acc-api/delivery', {
    responses: {
      '200': {
        description: 'Delivery model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Delivery } } },
      },
    },
  })
  async create(@requestBody() delivery: Delivery): Promise<Delivery> {
    return await this.deliveryRepository.create(delivery);
  }


  @get('/acc-api/delivery', {
    responses: {
      '200': {
        description: 'Array of Delivery model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Delivery } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Delivery)) filter?: Filter<Delivery>,
    //@param.query.object('filter') filter?: Filter,
    ): Promise<Delivery[]> {
    return await this.deliveryRepository.find(filter);
  }

  @get('/acc-api/delivery/{id}', {
    responses: {
      '200': {
        description: 'Delivery model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Delivery } } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Delivery> {
    return await this.deliveryRepository.findById(id);
  }

  @patch('/acc-api/delivery/{id}', {
    responses: {
      '204': {
        description: 'Delivery PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Delivery, { partial: true }),
        },
      },
    })
    delivery: Delivery,
  ): Promise<void> {
    await this.deliveryRepository.updateById(id, delivery);
  }

  @del('/acc-api/delivery/{id}', {
    responses: {
      '204': {
        description: 'delivery DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.deliveryRepository.deleteById(id);
  }  

}
