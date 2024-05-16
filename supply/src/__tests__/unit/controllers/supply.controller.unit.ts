import {Filter} from '@loopback/repository';
import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import {SupplyController} from '../../../controllers';
import {SupplyDataSource} from '../../../datasources';
import {SupplyRepository} from '../../../repositories';
import {Supply} from '../../../models';


describe('SupplyController (unit)', () => {
  let repository: StubbedInstanceWithSinonAccessor<SupplyRepository>;
  let supply: StubbedInstanceWithSinonAccessor<Supply>;
  beforeEach(givenStubbedRepository);


  describe('findbyid', () => {

    it('find by id ', async () => {

      const controller = new SupplyController(repository);
      const testObj = new Supply();
      testObj.id = '123';


      repository.stubs.findById.resolves(testObj);

      const result = await controller.findById('123');
      expect(result).to.containEql(testObj);

    });

  });





  function givenStubbedRepository() {
    repository = createStubInstance(SupplyRepository);
  }

});
