import {Filter} from '@loopback/repository';
import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import {SolController} from '../../../controllers';
import {SolDataSource} from '../../../datasources';
import {SolRepository} from '../../../repositories';
import {Sol} from '../../../models';


describe('SolController (unit)', () => {
  let repository: StubbedInstanceWithSinonAccessor<SolRepository>;
  let sol: StubbedInstanceWithSinonAccessor<Sol>;
  beforeEach(givenStubbedRepository);


  describe('findbyid', () => {

    it('find by id ', async () => {

      const controller = new SolController(repository);
      const testObj = new Sol();
      testObj.id = '123';
      testObj.sol_no = 'HHS-123456';

      repository.stubs.findById.resolves(testObj);

      const result = await controller.findById('123');
      expect(result).to.containEql(testObj);

    });

  });





  function givenStubbedRepository() {
    repository = createStubInstance(SolRepository);
  }

});
