import {Filter} from '@loopback/repository';
import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import {InspectionController} from '../../../controllers';
import {InspectionDataSource} from '../../../datasources';
import {InspectionRepository} from '../../../repositories';
import {Inspection} from '../../../models';


describe('InspectionController (unit)', () => {
  let repository: StubbedInstanceWithSinonAccessor<InspectionRepository>;
  let solDapp: StubbedInstanceWithSinonAccessor<Inspection>;
  beforeEach(givenStubbedRepository);


  describe('findbyid', () => {

    it('find by id ', async () => {

      const controller = new InspectionController(repository);
      const testObj = new Inspection();
      testObj.id = '123';
     

      repository.stubs.findById.resolves(testObj);

      const result = await controller.findById('123');
      expect(result).to.containEql(testObj);

    });

  });





  function givenStubbedRepository() {
    repository = createStubInstance(InspectionRepository);
  }

});
