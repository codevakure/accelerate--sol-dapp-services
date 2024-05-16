import {Filter} from '@loopback/repository';
import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import {CertController} from '../../../controllers';
import {CertDataSource} from '../../../datasources';
import {CertRepository} from '../../../repositories';
import {Cert} from '../../../models';


describe('CertController (unit)', () => {
  let repository: StubbedInstanceWithSinonAccessor<CertRepository>;
  let cert: StubbedInstanceWithSinonAccessor<Cert>;
  beforeEach(givenStubbedRepository);


  describe('findbyid', () => {

    it('find by id ', async () => {

      const controller = new CertController(repository);
      const testObj = new Cert();
      testObj.id = '123';

      repository.stubs.findById.resolves(testObj);

      const result = await controller.findById('123');
      expect(result).to.containEql(testObj);

    });

  });





  function givenStubbedRepository() {
    repository = createStubInstance(CertRepository);
  }

});
