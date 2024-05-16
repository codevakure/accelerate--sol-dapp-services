import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
  FilterBuilder,
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
import { VendorQa } from '../models';
import { VendorQaRepository } from '../repositories';

export class VendorQaController {
  constructor(
    @repository(VendorQaRepository)
    public vendorQaRepository: VendorQaRepository,
  ) { }


  // Simple healthcheck function for the HTTP GET on /email-service.  The ALB is expecting a 200 for this
  @get('/acc-api/vendor-qa/health', {
    responses: {
      '204': {
        description: 'Healthcheck status ok',
      },
    },
  })
  async healthCheck(): Promise<String> {
    return "status: ok";
  }


  @post('/acc-api/vendor-qa', {
    responses: {
      '200': {
        description: 'VendorQa model instance',
        content: { 'application/json': { schema: { 'x-ts-type': VendorQa } } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VendorQa, { exclude: ['id'] }),
        },
      },
    })
    vendorQa: Omit<VendorQa, 'id'>,
  ): Promise<VendorQa> {
    return await this.vendorQaRepository.create(vendorQa);
  }


  @get('/acc-api/vendor-qa', {
    responses: {
      '200': {
        description: 'Array of VendorQa model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': VendorQa } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(VendorQa)) filter?: Filter<VendorQa>,

  ): Promise<VendorQa[]> {
    return await this.vendorQaRepository.find(filter);
  }


  @get('/acc-api/vendor-qa/{id}', {
    responses: {
      '200': {
        description: 'VendorQa model instance',
        content: { 'application/json': { schema: { 'x-ts-type': VendorQa } } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<VendorQa> {
    return await this.vendorQaRepository.findById(id);
  }


  @get('/acc-api/vendor-qa/{sol_no}/solQa', {
    responses: {
      '200': {
        description: 'VendorQa model instance',
        content: { 'application/json': { schema: { 'x-ts-type': VendorQa } } },
      },
    },
  })
  async findBySolNo(@param.path.string('sol_no') sol_no: string): Promise<VendorQa[]> {

    let vendorResponses: VendorQa[] = [];
    const myfilter: Filter<VendorQa> = { where: { sol_no: sol_no } };
    vendorResponses = await this.vendorQaRepository.find(myfilter);

    return vendorResponses;
  }

  @get('/acc-api/vendor-qa/byVendorIdAndStatus', {
    responses: {
      '200': {
        description: 'VendorQa model instance',
        content: { 'application/json': { schema: { 'x-ts-type': VendorQa } } },
      },
    },
  })
  async findVQsByVendorIdAndStatus(@param.query.string('vendorId') vendorId: string ,@param.query.string('status') status: string): Promise<VendorQa[]> {
    
    //@param.query.string('keyWord') keyWord: string ,@param.query.string('naicscode') naicscode: string
    let vendorResponses: VendorQa[] = [];
    const myfilter: Filter<VendorQa> = { where: {"and" :[ { vendorId: vendorId}, {status : status} ] } };
    vendorResponses = await this.vendorQaRepository.find(myfilter);

    return vendorResponses;
  }

  // @get('/acc-api/vendor-qa/bySolNoAndStatus', {
  //   responses: {
  //     '200': {
  //       description: 'VendorQa model instance',
  //       content: { 'application/json': { schema: { 'x-ts-type': VendorQa } } },
  //     },
  //   },
  // })
  // async findVQsBySolNoAndStatus(@param.query.string('sol_no') sol_no: string ,@param.query.string('status') status: string): Promise<VendorQa[]> {

  //   //@param.query.string('keyWord') keyWord: string ,@param.query.string('naicscode') naicscode: string
  //   let vendorResponses: VendorQa[] = [];
  //   const myfilter: Filter<VendorQa> = { where: {"and" :[ { sol_no: sol_no}, {status : status} ] } };
  //   vendorResponses = await this.vendorQaRepository.find(myfilter);

  //   return vendorResponses;
  // }


  @get('/acc-api/vendor-qa/{vendor_id}/getByVendorId', {
    responses: {
      '200': {
        description: 'VendorQa model instance',
        content: { 'application/json': { schema: { 'x-ts-type': VendorQa } } },
      },
    },
  })
  async findByVendorId(@param.path.string('vendor_id') vendorId: string): Promise<VendorQa[]> {

    let vendorResponses: VendorQa[] = [];
    const myfilter: Filter<VendorQa> = { where: { vendorId: vendorId } };
    vendorResponses = await this.vendorQaRepository.find(myfilter);

    return vendorResponses;
  }

  @patch('/acc-api/vendor-qa/{id}', {
    responses: {
      '204': {
        description: 'VendorQa PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VendorQa, { partial: true }),
        },
      },
    })
    vendorQa: VendorQa,
  ): Promise<void> {
    await this.vendorQaRepository.updateById(id, vendorQa);
  }

  @patch('/acc-api/vendor-qa/{sol_no}/updateBySolNo', {
    responses: {
      '204': {
        description: 'VendorQa PATCH success',
      },
    },
  })
  async updateBySolNo(
    @param.path.string('sol_no') sol_no: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VendorQa, { partial: true }),
        },
      },
    })
    vendorQa: VendorQa,

  ): Promise<void> {
    const where: Where<VendorQa> = { sol_no: sol_no };
    await this.vendorQaRepository.updateAll(vendorQa, where);
  }


  @get('/acc-api/vendor-qa/{email}/getVendorQAbyEmail', {
    responses: {
      '200': {
        description: 'Array of VendorQa model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': VendorQa } },
          },
        },
      },
    },
  })
  async getVendorQAbyEmail(@param.path.string('email') email: string): Promise<VendorQa[]> {
    console.log("email passed --------"+email);

    const myFilter: Filter<VendorQa> = {where : { assignedEmail : email }}; 
    return await this.vendorQaRepository.find(myFilter);
    
  }

  // @patch('/acc-api/vendor-qa/{sol_no}/updateByStatus', {
  //   responses: {
  //     '204': {
  //       description: 'VendorQa PATCH success',
  //     },
  //   },
  // })
  // async updateByStatus(
  //   @param.path.string('sol_no') sol_no: string,
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(VendorQa, { partial: true }),
  //       },
  //     },
  //   })
  //   vendorQa: VendorQa,

  // ): Promise<void> {
  //   const where: Where<VendorQa> = { sol_no: sol_no };
  //   await this.vendorQaRepository.updateAll(vendorQa, where);
  // }


  @del('/acc-api/vendor-qa/{id}', {
    responses: {
      '204': {
        description: 'vendor-qa DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.vendorQaRepository.deleteById(id);
  } 

}
