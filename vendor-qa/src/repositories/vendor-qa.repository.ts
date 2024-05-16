
import { DefaultCrudRepository } from '@loopback/repository';
import { VendorQa, VendorQaRelations } from '../models';
import { VendorQaDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class VendorQaRepository extends DefaultCrudRepository<
  VendorQa,
  typeof VendorQa.prototype.id,
  VendorQaRelations
  > {
  constructor(
    @inject('datasources.vendorQA') dataSource: VendorQaDataSource,
  ) {
    super(VendorQa, dataSource);
  }
}
