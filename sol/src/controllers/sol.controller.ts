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
import { Sol } from '../models';
import { SolRepository } from '../repositories';
import { SolSearch } from '../models/solSearch.model';

export class SolController {
  constructor(
    @repository(SolRepository)
    public solRepository: SolRepository,
  ) { }


  // Simple healthcheck function for the HTTP GET on /email-service.  The ALB is expecting a 200 for this
  @get('/acc-api/sol/health', {
    responses: {
      '204': {
        description: 'Healthcheck status ok',
      },
    },
  })
  async healthCheck(): Promise<String> {
    return "status: ok";
  }
  @post('/acc-api/sol', {
    responses: {
      '200': {
        description: 'Sol model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Sol } } },
      },
    },
  })
  async create(@requestBody() sol: Sol): Promise<Sol> {
    if(sol.amendment_no === undefined  ){
      sol.isAmendment = false;
    }
    return await this.solRepository.create(sol);
  }

  @post('/acc-api/sol/remote', {
    responses: {
      '200': {
        description: 'Sol model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Sol } } },
      },
    },
  })
  async createRemote(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sol, { exclude: ['id'] }),
        },
      },
    })
    sol: Omit<Sol, 'id'>,
  ): Promise<Sol> {
    return await this.solRepository.create(sol);
  }


  @get('/acc-api/sol', {
    responses: {
      '200': {
        description: 'Array of Sol model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Sol } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Sol)) filter?: Filter<Sol>,
    //@param.query.object('filter') filter?: Filter,
  ): Promise<Sol[]> {
    console.log("Filter "+JSON.stringify(filter));
    return await this.solRepository.find(filter);
  }



  @get('/acc-api/sol-dapp/{currentuserid}/getSolByUserId', {
    responses: {
      '200': {
        description: 'Array of Sol model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Sol } },
          },
        },
      },
    },
  })
  async getSolByUserId(@param.path.string('currentuserid') currentuserid: string
  ):
    Promise<any> {
    const solFilter: Filter<Sol> = { where: { or: [{ and: [{ status: 'Published' }, { pointsofContact: { inq: [currentuserid] } }] }, { and: [{ status: 'Initiated' }, { pointsofContact: { inq: [currentuserid] } }] }, { and: [{ status: 'Published' }, { sharedCollaborators: { inq: [currentuserid] } }] }, { and: [{ status: 'Published' }, { sharedCollaborators: { inq: [currentuserid] } }] }] } };
    //const solFilter: Filter<Sol> = {where : {or:[{and:[{status:'Published'}]},{and:[{status:'Initiated'}]},{and:[{status:'Published'}]},{and:[{status:'Published'}]}]}} ;
    return await this.solRepository.find(solFilter);
  }


  @get('/acc-api/sol/{currentuserid}/getSolMonthlyCountsByUser', {
    responses: {
      '200': {
        description: 'Solicitation Count',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Sol } },
          },
        },
      },
    },
  })
  async getSolMonthyCountsByUser(@param.path.string('currentuserid') currentuserid: string): Promise<number[]> {
    console.log("User passed --------" + currentuserid);
    let solCount: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let todaysDate = new Date();
    console.log("today's date " + todaysDate);
    let currentYear = new Date().getFullYear();
    console.log("Year " + currentYear);
    let decEdate: string = `${currentYear}",12,31"`;
    let novEdate: string = `${currentYear}",11,30"`;
    let octEdate: string = `${currentYear}",10,31"`;
    let sptEdate: string = `${currentYear}",09,30"`;
    let agstEdate: string = `${currentYear}",08,31"`;
    let jlyEdate: string = `${currentYear}",07,31"`;
    let junEdate: string = `${currentYear}",06,30"`;
    let mayEdate: string = `${currentYear}",05,31"`;
    let aprlEdate: string = `${currentYear}",04,30"`;
    let mrchEdate: string = `${currentYear}",03,31"`;
    let febEdate: string = `${currentYear}",02,29"`;
    let janEdate: string = `${currentYear}",01,31"`;

    //let endDates: string[] = [ decEdate, novEdate , octEdate,sptEdate,agstEdate,jlyEdate,junEdate,mayEdate,aprlEdate,mrchEdate,febEdate,janEdate];
    let endDates: string[] = [janEdate, febEdate, mrchEdate, aprlEdate, mayEdate, junEdate, jlyEdate, agstEdate, sptEdate, octEdate, novEdate, decEdate];
    let decSdate: string = `${currentYear}",12,01"`;
    let novSdate: string = `${currentYear}",11,01"`;
    let octSdate: string = `${currentYear}",10,01"`;
    let sptSdate: string = `${currentYear}",09,01"`;
    let agstSdate: string = `${currentYear}",08,01"`;
    let jlySdate: string = `${currentYear}",07,01"`;
    let junSdate: string = `${currentYear}",06,01"`;
    let maySdate: string = `${currentYear}",05,01"`;
    let aprlSdate: string = `${currentYear}",04,01"`;
    let mrchSdate: string = `${currentYear}",03,01"`;
    let febSdate: string = `${currentYear}",02,01"`;
    let janSdate: string = `${currentYear}",01,01"`;
    //let startDates: string[] = [ decSdate, novSdate , octSdate,sptSdate,agstSdate,jlySdate,junSdate,maySdate,aprlSdate,mrchSdate,febSdate,janSdate] ;
    let startDates: string[] = [janSdate, febSdate, mrchSdate, aprlSdate, maySdate, junSdate, jlySdate, agstSdate, sptSdate, octSdate, novSdate, decSdate];
    let start: Date;
    let end: Date;


    try {
      for (let m: number = 0; m < 12; m++) {
        console.log("m  " + m);
        start = new Date(startDates[m]);
        console.log(start);
        end = new Date(endDates[m]);

        console.log(end);
        const myfilter: Filter<Sol> = { where: { and: [{ acceptedDate: { gte: start } }, { acceptedDate: { lte: end } }, { or: [{ and: [{ status: 'Published' }, { pointsofContact: { inq: [currentuserid] } }] }, { and: [{ status: 'Initiated' }, { pointsofContact: { inq: [currentuserid] } }] }, { and: [{ status: 'Published' }, { sharedCollaborators: { inq: [currentuserid] } }] }, { and: [{ status: 'Published' }, { sharedCollaborators: { inq: [currentuserid] } }] }, { and: [{ status: 'Initiated' }, { sharedCollaborators: { inq: [currentuserid] } }] }] }] } };
        console.log("filter for the month" + (m) + " " + JSON.stringify(myfilter));
        let result: {}[] = await this.solRepository.find(myfilter);
        let nov = result.length;
        solCount[m] = nov;
      }
      return solCount;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  // Search Solicitation By filter
  //@get('/acc-api/sol/searchByParams/{keyWord}/{naicscode}/{state}', {
  @get('/acc-api/sol/searchByParams', {
    responses: {
      '200': {
        description: 'Search Soliciation',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Sol } },
          },
        },
      },
    },
  })
  //async getSolicitationsByParams(@param.path.string('keyWord') keyWord: string ,@param.path.string('naicscode') naicscode: string,@param.path.string('state') state: string): Promise<Sol[]> {
  async getSolicitationsByParams(@param.query.string('keyWord') keyWord: string, @param.query.string('naicscode') naicscode: string, @param.query.string('state') state: string): Promise<Sol[]> {
    console.log("keyWord Before-----------------------" + keyWord);

    let searchText: string = `/^[^@]*${keyWord}/i`;
    //let searchText : string  = "/^[^@]*"+keyWord+"/i" ;
    // let naicsCodeVal : string  = `/^[^@]*${keyWord}/i` ;

    console.log("keyWord after-----------------------" + keyWord);
    console.log("search text -----------------------" + searchText);
    console.log("naics code ----------------- " + naicscode);
    console.log(" state " + state);
    let solList: Sol[] = [];
    // const myfilter: Filter<Sol> = {where :{ "or" :[ { projectTitle : searchText }, {projectTitle : searchText }] } };
    //const myfilter: Filter<Sol> = {where :{ "or" :[ {projectTitle : {"regexp":searchText} } , { description : {"regexp":searchText} } ] } };
    // const myfilter: Filter<Sol> = {where :{ projectTitle : {"regexp":searchText} } };
    //const myfilter: Filter<Sol> = {where :{ "or" :[ {projectTitle : {"regexp":searchText} } , { description : {"regexp":searchText} } , { naicscode : {"regexp":naicscode} } ] } };
    //const myfilter: Filter<Sol> = {where :{ "or" :[ {projectTitle : {"regexp":searchText} } , { description : {"regexp":searchText} } ] ,"and" :[{ naicscode : {"regexp":naicscode} } ] } };
    //solList = await this.solRepository.find(myfilter);

    let myfilter: Filter<Sol> = {};
    let todayDate = new Date();
    //Only KeyWord filter
    if (keyWord != undefined && naicscode === undefined && state === undefined) {
      console.log(" Executing Only KeyWord filter ");
      myfilter = { where: { "or": [{ projectTitle: { "regexp": searchText } }, { description: { "regexp": searchText } }] } };
    }

    //Only naicscode filter
    if (keyWord === undefined && naicscode != undefined && state === undefined) {
      console.log(" Executing Only naicscode filter ");
      myfilter = { where: { naicscode: naicscode } };

    }

    //Only state filter
    if (keyWord === undefined && naicscode === undefined && state != undefined) {
      console.log(" Executing Only state filter ");

      console.log("todayDate --------------------");
      console.log(todayDate);

      if (state == 'Open' || state == 'open') {

        myfilter = { where: { "or": [{ offerDueDate: { gt: todayDate } }, { offerDueDate: undefined }] } };
      } else {


        myfilter = { where: { "or": [{ offerDueDate: { lt: todayDate } }, { offerDueDate: todayDate }] } };


        //myfilter = {where :{ status:state } };
      }


    }

    // KeyWord and naicscode filter
    if (keyWord != undefined && naicscode != undefined && state === undefined) {
      console.log(" Executing KeyWord and naicscode filter ");
      myfilter = { where: { "or": [{ projectTitle: { "regexp": searchText } }, { description: { "regexp": searchText } }], "and": [{ naicscode: naicscode }] } };

    }

    // KeyWord and State filer
    if (keyWord != undefined && naicscode === undefined && state != undefined) {
      console.log(" Executing KeyWord and state filter ");
      myfilter = { where: { "or": [{ projectTitle: { "regexp": searchText } }, { description: { "regexp": searchText } }], "and": [{ "or": [{ offerDueDate: { lt: todayDate } }, { offerDueDate: todayDate }] }] } };
    }

    //naicscode and state filter
    if (keyWord === undefined && naicscode != undefined && state != undefined) {
      console.log(" Executing naicscode and state filter ");
      myfilter = { where: { "and": [{ naicscode: naicscode }, { status: state }] } };
    }

    // KeyWord , naics and state filter
    if (keyWord != undefined && naicscode != undefined && state != undefined) {
      console.log(" Executing all three KeyWord, naicscode, and state filter ");
      //if state is open
      if (state == 'Open' || state == 'open') {
        myfilter = { where: { "or": [{ projectTitle: { "regexp": searchText } }, { description: { "regexp": searchText } }], "and": [{ naicscode: naicscode }, { "or": [{ offerDueDate: { gt: todayDate } }, { offerDueDate: undefined }] }] } };
      } else {
        myfilter = { where: { "or": [{ projectTitle: { "regexp": searchText } }, { description: { "regexp": searchText } }], "and": [{ naicscode: naicscode }, { "or": [{ offerDueDate: { lt: todayDate } }, { offerDueDate: todayDate }] }] } };
      }
    }
    solList = await this.solRepository.find(myfilter);
    return solList;
  }




  @get('/acc-api/sol/{id}', {
    responses: {
      '200': {
        description: 'Sol model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Sol } } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Sol> {
    return await this.solRepository.findById(id);
  }

  @patch('/acc-api/sol/{id}', {
    responses: {
      '204': {
        description: 'Sol PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sol, { partial: true }),
        },
      },
    })
    sol: Sol,
  ): Promise<void> {
    await this.solRepository.updateById(id, sol);
  }




  @get('/acc-api/sol/getSolicitationMonthlyCount', {
    responses: {
      '200': {
        description: 'Sol count ',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Sol } },
          },
        },
      },
    },
  })
  async getSolicitationMonthlyCount(): Promise<number[]> {
    let solCount: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let todaysDate = new Date();
    console.log("today's date " + todaysDate);
    let currentYear = new Date().getFullYear();
    console.log("Year " + currentYear);
    let decEdate: string = `${currentYear}",12,31"`;
    let novEdate: string = `${currentYear}",11,30"`;
    let octEdate: string = `${currentYear}",10,31"`;
    let sptEdate: string = `${currentYear}",09,30"`;
    let agstEdate: string = `${currentYear}",08,31"`;
    let jlyEdate: string = `${currentYear}",07,31"`;
    let junEdate: string = `${currentYear}",06,30"`;
    let mayEdate: string = `${currentYear}",05,31"`;
    let aprlEdate: string = `${currentYear}",04,30"`;
    let mrchEdate: string = `${currentYear}",03,31"`;
    let febEdate: string = `${currentYear}",02,28"`;
    let janEdate: string = `${currentYear}",01,31"`;

    let endDates: string[] = [decEdate, novEdate, octEdate, sptEdate, agstEdate, jlyEdate, junEdate, mayEdate, aprlEdate, mrchEdate, febEdate, janEdate];

    let decSdate: string = `${currentYear}",12,01"`;
    let novSdate: string = `${currentYear}",11,01"`;
    let octSdate: string = `${currentYear}",10,01"`;
    let sptSdate: string = `${currentYear}",09,01"`;
    let agstSdate: string = `${currentYear}",08,01"`;
    let jlySdate: string = `${currentYear}",07,01"`;
    let junSdate: string = `${currentYear}",06,01"`;
    let maySdate: string = `${currentYear}",05,01"`;
    let aprlSdate: string = `${currentYear}",04,01"`;
    let mrchSdate: string = `${currentYear}",03,01"`;
    let febSdate: string = `${currentYear}",02,01"`;
    let janSdate: string = `${currentYear}",01,01"`;
    let startDates: string[] = [decSdate, novSdate, octSdate, sptSdate, agstSdate, jlySdate, junSdate, maySdate, aprlSdate, mrchSdate, febSdate, janSdate];
    let start: Date;
    let end: Date;
    try {
      for (let m: number = 11; m >= 0; m--) {
        console.log("m  " + m);
        start = new Date(startDates[m]);
        end = new Date(endDates[m]);

        const myfilter: Filter<Sol> = { where: { and: [{ or: [{ status: 'PUBLISHED' }, { status: 'Published' }, { status: 'published' }, { status: 'INITIATED' }, { status: 'Initiated' }, { status: 'initiated' }] }, { acceptedDate: { gte: start } }, { acceptedDate: { lt: end } }] } };
        //const myfilter: Filter<Sol> = { where: { and: [ {acceptedDate: {gte: start } }, {acceptedDate:{lt: end }  } ] } };
        console.log(myfilter);
        let result: {}[] = await this.solRepository.find(myfilter);
        let nov = result.length;
        solCount[m] = nov;
      }
      return solCount;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  @post('/acc-api/sol/searchByCriteria', {
    responses: {
      '204': {
        description: 'Sol Search Criteria ',
      },
    },
  })
  async searchByCriteria(

    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolSearch, { partial: true }),
        },
      },
    })
    sol: SolSearch,
  ): Promise<Sol[]> {
    console.log("Sol passed.....................");
    console.log(sol);
    console.log("Due date....................." + sol.offerDueDate);
    console.log("Status....................." + sol.status);
    let solList: Sol[] = [];
    let myfilter: Filter<any> = { where: { "and": [sol] } };
    if (sol.status == 'Open' || sol.status == 'open' || sol.status == 'Published' || sol.status == 'published') {
      console.log("executing open status................");
      sol.status = 'Published'
      myfilter = { where: { "and": [sol] } };
    } else if (sol.offerDueDate == undefined && (sol.status == 'Closed' || sol.status == 'closed')) {
      console.log("executing close status................" + (new Date()).toISOString());
      sol.status = undefined;
      //sol.offerDueDate = new Date();
      myfilter = { where: { "and": [sol, { offerDueDate: { lt: (new Date()).toISOString() } }] } };
      //myfilter =   {where :{ "and" :[sol] } };
    }// }else {
    //   console.log("executing default status................");
    //   myfilter =   {where :{ "and" :[sol] } };

    // }


    console.log("myfilter ----------------------");
    console.log(myfilter);
    solList = await this.solRepository.find(myfilter);
    return solList;
  }


  @del('/acc-api/sol/{id}', {
    responses: {
      '204': {
        description: 'sol DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.solRepository.deleteById(id);
  }

}
