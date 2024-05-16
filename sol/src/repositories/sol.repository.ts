import {DefaultCrudRepository} from '@loopback/repository';
import {Sol, SolRelations} from '../models';
import {SolDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SolRepository extends DefaultCrudRepository<
  Sol,
  typeof Sol.prototype.id,
  SolRelations
> {
  constructor(
    @inject('datasources.sol') dataSource: SolDataSource,
  ) {
    super(Sol, dataSource);
  }
}
