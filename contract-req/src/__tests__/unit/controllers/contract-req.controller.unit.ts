import {Filter} from '@loopback/repository';
import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import {ContractReqController} from '../../../controllers';
import {ContractReqDataSource} from '../../../datasources';
import {ContractReqRepository} from '../../../repositories';
import {ContractReq} from '../../../models';


describe('ContractReqController (unit)', () => {
  let repository: StubbedInstanceWithSinonAccessor<ContractReqRepository>;
  let contractReq: StubbedInstanceWithSinonAccessor<ContractReq>;
  beforeEach(givenStubbedRepository);


  describe('findbyid', () => {

    it('find by id ', async () => {

      const controller = new ContractReqController(repository);
      const testObj = new ContractReq();
      testObj.id = '123';
 

      repository.stubs.findById.resolves(testObj);

      const result = await controller.findById('123');
      expect(result).to.containEql(testObj);

    });

  });





  function givenStubbedRepository() {
    repository = createStubInstance(ContractReqRepository);
  }

});
