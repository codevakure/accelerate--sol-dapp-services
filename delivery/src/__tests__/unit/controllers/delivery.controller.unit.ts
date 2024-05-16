import {Filter} from '@loopback/repository';
import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import {DeliveryController} from '../../../controllers';
import {DeliveryDataSource} from '../../../datasources';
import {DeliveryRepository} from '../../../repositories';
import {Delivery} from '../../../models';


describe('DeliveryController (unit)', () => {
  let repository: StubbedInstanceWithSinonAccessor<DeliveryRepository>;
  let delivery: StubbedInstanceWithSinonAccessor<Delivery>;
  beforeEach(givenStubbedRepository);


  describe('findbyid', () => {

    it('find by id ', async () => {

      const controller = new DeliveryController(repository);
      const testObj = new Delivery();
      testObj.id = '123';
  

      repository.stubs.findById.resolves(testObj);

      const result = await controller.findById('123');
      expect(result).to.containEql(testObj);

    });

  });





  function givenStubbedRepository() {
    repository = createStubInstance(DeliveryRepository);
  }

});
