import {DefaultCrudRepository} from '@loopback/repository';
import {SolDapp, SolDappRelations} from '../models';
import {SoldappDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SolDappRepository extends DefaultCrudRepository<
  SolDapp,
  typeof SolDapp.prototype.sol_no,
  SolDappRelations
> {
  constructor(
    @inject('datasources.soldapp') dataSource: SoldappDataSource,
  ) {
    super(SolDapp, dataSource);
  }
}
