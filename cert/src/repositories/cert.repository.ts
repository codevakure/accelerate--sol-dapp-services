import {DefaultCrudRepository} from '@loopback/repository';
import {Cert, CertRelations} from '../models';
import {CertDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CertRepository extends DefaultCrudRepository<
  Cert,
  typeof Cert.prototype.id,
  CertRelations
> {
  constructor(
    @inject('datasources.cert') dataSource: CertDataSource,
  ) {
    super(Cert, dataSource);
  }
}
