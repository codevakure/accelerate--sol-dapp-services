import {DefaultCrudRepository} from '@loopback/repository';
import {Packaging, PackagingRelations} from '../models';
import {PackagingDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PackagingRepository extends DefaultCrudRepository<
  Packaging,
  typeof Packaging.prototype.id,
  PackagingRelations
> {
  constructor(
    @inject('datasources.packaging') dataSource: PackagingDataSource,
  ) {
    super(Packaging, dataSource);
  }
}
