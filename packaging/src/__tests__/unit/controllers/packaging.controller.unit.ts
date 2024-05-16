import { Filter } from '@loopback/repository';
import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import { PackagingController } from '../../../controllers';
import { PackagingRepository } from '../../../repositories';
import { Packaging } from '../../../models';


describe('PackagingController (unit)', () => {
  let repository: StubbedInstanceWithSinonAccessor<PackagingRepository>;
  let packaging: StubbedInstanceWithSinonAccessor<Packaging>;
  beforeEach(givenStubbedRepository);


  describe('findbyid', () => {

    it('find by id ', async () => {

      const controller = new PackagingController(repository);
      const testObj = new Packaging();
      testObj.id = '123';


      repository.stubs.findById.resolves(testObj);

      const result = await controller.findById('123');
      expect(result).to.containEql(testObj);

    });

  });





  function givenStubbedRepository() {
    repository = createStubInstance(PackagingRepository);
  }

});
