import {Filter} from '@loopback/repository';
import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import {ContractAdminController} from '../../../controllers';
import {ContractAdminDataSource} from '../../../datasources';
import {ContractAdminRepository} from '../../../repositories';
import {ContractAdmin} from '../../../models';


describe('ContractAdminController (unit)', () => {
  let repository: StubbedInstanceWithSinonAccessor<ContractAdminRepository>;
  let contractAdmin: StubbedInstanceWithSinonAccessor<ContractAdmin>;
  beforeEach(givenStubbedRepository);


  describe('findbyid', () => {

    it('find by id ', async () => {

      const controller = new ContractAdminController(repository);
      const testObj = new ContractAdmin();
      testObj.id = '123';
     

      repository.stubs.findById.resolves(testObj);

      const result = await controller.findById('123');
      expect(result).to.containEql(testObj);

    });

  });





  function givenStubbedRepository() {
    repository = createStubInstance(ContractAdminRepository);
  }

});
