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
import { Cors } from '../models';
import { CorsRepository } from '../repositories';

export class CorsController {
  constructor(
    @repository(CorsRepository)
    public corsRepository: CorsRepository,
  ) { }

  @get('/acc-api/cors/health', {
    responses: {
      '204': {
        description: 'Healthcheck status ok',
      },
    },
  })
  async healthCheck(): Promise<String> {
    return "status: ok";
  }

  @post('/acc-api/cors', {
    responses: {
      '200': {
        description: 'Cors model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Cors) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cors, {
            title: 'NewCors',

          }),
        },
      },
    })
    cors: Cors,
  ): Promise<Cors> {
    cors.data = '      <div><span style="color: rgb(24, 62, 103);">A. DESIGNATION OF COR </span></div>  '  + 
    '       <div><span style="color: rgb(24, 62, 103);">The COR is designated in writing in the contract schedule and by this  '  + 
    '               letter. This designation will set forth in detail the full extent of the CORs authority and limitations  '  + 
    '               therein. The designation does not change or supersede the established line of authority and/or  '  + 
    '               responsibility of any organization. Changes in the designated COR will be made by modification to the  '  + 
    '               contract and letter appointment as the need arises. Your designation as COR applies to the subject contract  '  + 
    '               only, and shall terminate on completion of the contract. </span></div>  '  + 
    '       <div><br></div>  '  + 
    '       <div><span style="color: rgb(24, 62, 103);">B. SCOPE OF SPECIFIC RESPONSIBILITIES </span></div>  '  + 
    '       <ol>  '  + 
    '           <li><span style="color: rgb(24, 62, 103);">Developing the contract specifications or work statement in such a  '  + 
    '                   manner as to promote competitive procurement actions; </span></li>  '  + 
    '           <li><span style="color: rgb(24, 62, 103);">Coordinating with the program office actions relating to funding and  '  + 
    '                   changes in scope of work; </span></li>  '  + 
    '           <li><span style="color: rgb(24, 62, 103);">Monitoring the Contractors performance of the technical requirements  '  + 
    '                   of the contract to assure that performance is strictly within the scope of the contract; </span></li>  '  + 
    '           <li><span style="color: rgb(24, 62, 103);">Confirming all significant technical instructions to the Contractor;  '  + 
    '               </span></li>  '  + 
    '           <li><span style="color: rgb(24, 62, 103);">Assuring that changes in the work or services, and resulting effects  '  + 
    '                   on delivery schedule, are formally effected by written modification issued by the Contracting Officer  '  + 
    '                   before the Contractor proceeds with the changes; </span></li>  '  + 
    '           <li><span style="color: rgb(24, 62, 103);">Assuring prompt review of draft reports and providing approval to the  '  + 
    '                   Contractor so that his distribution of the reports can be within the specified completion date of the  '  + 
    '                   contract, and assuring prompt inspection and acceptance or rejection of other deliverable items; </span>  '  + 
    '           </li>  '  + 
    '           <li><span style="color: rgb(24, 62, 103);">Maintaining a contract-working file; </span></li>  '  + 
    '           <li><span style="color: rgb(24, 62, 103);">Referring to the Contracting Officer those matters, other than purely  '  + 
    '                   technical problems, which may affect he contract; </span></li>  '  + 
    '           <li><span style="color: rgb(24, 62, 103);">Informing the Contracting Officer when a contractor is known to be  '  + 
    '                   behind schedule, with the reasons therefore, and coordinating with the Contracting Officer corrective  '  + 
    '                   action necessary to restore the contract schedule; </span></li>  '  + 
    '           <li><span style="color: rgb(24, 62, 103);">Furnishing to the Contracting Officer a copy of conference reports  '  + 
    '                   and correspondence and coordination with the Contracting Officer on the content of any contractually  '  + 
    '                   significant correspondence addressed to the Contractor in order to prevent possible misunderstanding or  '  + 
    '                   the creation of a condition that may be made the basis of a later claim. All correspondence addressed to  '  + 
    '                   the contractor will be signed by the Contracting Officer;</span></li>  '  + 
    '       </ol>  '  + 
    '       <div><br></div>  '  + 
    '       <div><span style="color: rgb(24, 62, 103);">C.</span> <u style="color: rgb(24, 62, 103);">EXCLUSIONS FROM COR  '  + 
    '               RESPONSIBILITIES </u><span style="color: rgb(24, 62, 103);"> </span></div>  '  + 
    '       <div>The COR is expressly excluded from performing or being responsible for the following: </div>  '  + 
    '       <ol>  '  + 
    '           <li>Making commitments or promises to contractors relating to award of contracts; </li>  '  + 
    '           <li>Writing contract requirements around the product or capacity of one source; </li>  '  + 
    '           <li>Soliciting proposals; </li>  '  + 
    '           <li>Modifying the stated terms of the contract; </li>  '  + 
    '           <li>Issuing instructions to contractors to start or stop work; </li>  '  + 
    '           <li>Approving items of cost not specifically authorized by the contract; </li>  '  + 
    '           <li>Directing changes; </li>  '  + 
    '           <li>Executing supplemental agreements; </li>  '  + 
    '           <li>Rendering a decision on any dispute on any question of fact under the Disputes provision of the contract;  '  + 
    '           </li>  '  + 
    '           <li>Taking any action with respect to termination, except to notify the Contracting Officer;</li>  '  + 
    '       </ol>  '  + 
    '       <div><br></div>  '  + 
    '       <div>Violation of the foregoing may give the appearance that this organization is not acting in good faith.  '  + 
    '           Commitments made to contractors by other than duly appointed Contracting Officers may result in formal protests  '  + 
    '           by other companies, embarrassment to the Department, criticism by the Government Accountability Office and  '  + 
    '           possible monetary loss to the individual and the firm involved. </div>  '  + 
    '       <div><br></div>  '  + 
    '       <div>Sincerely,</div>  '  + 
    '       <div><br></div>  '  + 
    '      <div> </div>  '
;
    return this.corsRepository.create(cors);
  }

  @get('/acc-api/cors/count', {
    responses: {
      '200': {
        description: 'Cors model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Cors)) where?: Where<Cors>,
  ): Promise<Count> {
    return this.corsRepository.count(where);
  }

  @get('/acc-api/cors/', {
    responses: {
      '200': {
        description: 'Array of Cors model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Cors) },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Cors)) filter?: Filter<Cors>,
   //@param.query.object('filter') filter?: Filter,
   ): Promise<Cors[]> {
    return this.corsRepository.find(filter);
  }

  @patch('/acc-api/cors/', {
    responses: {
      '200': {
        description: 'Cors PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cors, { partial: true }),
        },
      },
    })
    cors: Cors,
    @param.query.object('where', getWhereSchemaFor(Cors)) where?: Where<Cors>,
  ): Promise<Count> {
    return this.corsRepository.updateAll(cors, where);
  }

  @get('/acc-api/cors/{id}', {
    responses: {
      '200': {
        description: 'Cors model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Cors) } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Cors> {
    return this.corsRepository.findById(id);
  }

  @patch('/acc-api/cors/{id}', {
    responses: {
      '204': {
        description: 'Cors PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cors, { partial: true }),
        },
      },
    })
    cors: Cors,
  ): Promise<void> {
    await this.corsRepository.updateById(id, cors);
  }

  @put('/acc-api/cors/{id}', {
    responses: {
      '204': {
        description: 'Cors PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() cors: Cors,
  ): Promise<void> {
    await this.corsRepository.replaceById(id, cors);
  }

  @del('/acc-api/cors/{id}', {
    responses: {
      '204': {
        description: 'Cors DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.corsRepository.deleteById(id);
  }
}
