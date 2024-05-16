import {Filter} from '@loopback/repository';
import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import {FormController} from '../../../controllers';
import {FormDataSource} from '../../../datasources';
import {FormRepository} from '../../../repositories';
import {Form} from '../../../models';


describe('FormController (unit)', () => {
  let repository: StubbedInstanceWithSinonAccessor<FormRepository>;
  let form: StubbedInstanceWithSinonAccessor<Form>;
  beforeEach(givenStubbedRepository);


  describe('findbyid', () => {

    it('find by id ', async () => {

      const controller = new FormController(repository);
      const testObj = new Form();
      testObj.id = '123';


      repository.stubs.findById.resolves(testObj);

      const result = await controller.findById('123');
      expect(result).to.containEql(testObj);

    });

  });





  function givenStubbedRepository() {
    repository = createStubInstance(FormRepository);
  }

});
