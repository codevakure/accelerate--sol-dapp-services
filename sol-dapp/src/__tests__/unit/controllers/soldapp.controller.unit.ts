import {Filter} from '@loopback/repository';
import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import {SoldappController} from '../../../controllers';
import {SoldappDataSource} from '../../../datasources';
import {SolDappRepository, AmendmentDappRepository} from '../../../repositories';
import {SolDapp} from '../../../models';


describe('SolDappController (unit)', () => {
  let repository: StubbedInstanceWithSinonAccessor<SolDappRepository>;
  let amendRepository: StubbedInstanceWithSinonAccessor<AmendmentDappRepository>;
  let solDapp: StubbedInstanceWithSinonAccessor<SolDapp>;
  beforeEach(givenStubbedRepository);


  describe('findbyid', () => {

    it('find by id ', async () => {

      const controller = new SoldappController(repository,amendRepository);
      const testObj = new SolDapp();
      testObj.solId = '123';
      testObj.sol_no = 'HHS-123456';

      repository.stubs.findById.resolves(testObj);

      const result = await controller.findById('123');
      expect(result).to.containEql(testObj);

    });

  });





  function givenStubbedRepository() {
    repository = createStubInstance(SolDappRepository);
  }

});
