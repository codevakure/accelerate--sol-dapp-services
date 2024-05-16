import {DefaultCrudRepository} from '@loopback/repository';

import {SoldappDataSource} from '../datasources';
import {inject} from '@loopback/core';
import { AmendmentDapp, AmendmentDappRelations } from '../models/amendment-dapp.model';

export class AmendmentDappRepository extends DefaultCrudRepository<
  AmendmentDapp,
  typeof AmendmentDapp.prototype.sol_no,
  AmendmentDappRelations
> {
  constructor(
    @inject('datasources.soldapp') dataSource: SoldappDataSource,
  ) {
    super(AmendmentDapp, dataSource);
  }
}
