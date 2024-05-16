import {Filter} from '@loopback/repository';
import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import {ContractClauseController} from '../../../controllers';
import {ContractclauseDataSource} from '../../../datasources';
import {ContractClauseRepository} from '../../../repositories';
import {ContractClause} from '../../../models';


describe('ContractClauseController (unit)', () => {
  let repository: StubbedInstanceWithSinonAccessor<ContractClauseRepository>;
  let contractClause: StubbedInstanceWithSinonAccessor<ContractClause>;
  beforeEach(givenStubbedRepository);


  describe('findbyid', () => {

    it('find by id ', async () => {

      const controller = new ContractClauseController(repository);
      const testObj = new ContractClause();
      testObj.id = '123';

      repository.stubs.findById.resolves(testObj);

      const result = await controller.findById('123');
      expect(result).to.containEql(testObj);

    });

  });





  function givenStubbedRepository() {
    repository = createStubInstance(ContractClauseRepository);
  }

});
