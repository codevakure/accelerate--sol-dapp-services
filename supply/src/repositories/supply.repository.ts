import {DefaultCrudRepository} from '@loopback/repository';
import {Supply, SupplyRelations} from '../models';
import {SupplyDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SupplyRepository extends DefaultCrudRepository<
  Supply,
  typeof Supply.prototype.id,
  SupplyRelations
> {
  constructor(
    @inject('datasources.supply') dataSource: SupplyDataSource,
  ) {
    super(Supply, dataSource);
  }
}
