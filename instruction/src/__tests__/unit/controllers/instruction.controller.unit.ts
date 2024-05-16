import {Filter} from '@loopback/repository';
import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import {InstructionController} from '../../../controllers';
import {InstructionDataSource} from '../../../datasources';
import {InstructionRepository} from '../../../repositories';
import {Instruction} from '../../../models';


describe('InstructionController (unit)', () => {
  let repository: StubbedInstanceWithSinonAccessor<InstructionRepository>;
  let instruction: StubbedInstanceWithSinonAccessor<Instruction>;
  beforeEach(givenStubbedRepository);


  describe('findbyid', () => {

    it('find by id ', async () => {

      const controller = new InstructionController(repository);
      const testObj = new Instruction();
      testObj.id = '123';


      repository.stubs.findById.resolves(testObj);

      const result = await controller.findById('123');
      expect(result).to.containEql(testObj);

    });

  });





  function givenStubbedRepository() {
    repository = createStubInstance(InstructionRepository);
  }

});
