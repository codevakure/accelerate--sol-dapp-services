import {DefaultCrudRepository} from '@loopback/repository';
import {Soc, SocRelations} from '../models';
import {SocDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SocRepository extends DefaultCrudRepository<
  Soc,
  typeof Soc.prototype.id,
  SocRelations
> {
  constructor(
    @inject('datasources.soc') dataSource: SocDataSource,
  ) {
    super(Soc, dataSource);
  }
}
