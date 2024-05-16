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
import { Instruction } from '../models';
import { InstructionRepository } from '../repositories';

export class InstructionController {
  constructor(
    @repository(InstructionRepository)
    public instructionRepository: InstructionRepository,
  ) { }


  // Simple healthcheck function for the HTTP GET on /email-service.  The ALB is expecting a 200 for this
  @get('/acc-api/instruction/health', {
    responses: {
      '204': {
        description: 'Healthcheck status ok',
      },
    },
  })
  async healthCheck(): Promise<String> {
    return "status: ok";
  }



  @post('/acc-api/instruction', {
    responses: {
      '200': {
        description: 'Instruction model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Instruction } } },
      },
    },
  })
  async create(@requestBody() instruction: Instruction): Promise<Instruction> {
    return await this.instructionRepository.create(instruction);
  }


  @get('/acc-api/instruction', {
    responses: {
      '200': {
        description: 'Array of Instruction model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Instruction } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Instruction)) filter?: Filter<Instruction>,
    //@param.query.object('filter') filter?: Filter,
    ): Promise<Instruction[]> {
    return await this.instructionRepository.find(filter);
  }


  @get('/acc-api/instruction/{id}', {
    responses: {
      '200': {
        description: 'Instruction model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Instruction } } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Instruction> {
    return await this.instructionRepository.findById(id);
  }

  @patch('/acc-api/instruction/{id}', {
    responses: {
      '204': {
        description: 'Instruction PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Instruction, { partial: true }),
        },
      },
    })
    instruction: Instruction,
  ): Promise<void> {
    await this.instructionRepository.updateById(id, instruction);
  }


  @del('/acc-api/instruction/{id}', {
    responses: {
      '204': {
        description: 'instruction DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.instructionRepository.deleteById(id);
  }  

}
