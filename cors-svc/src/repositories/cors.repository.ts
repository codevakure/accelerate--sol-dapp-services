import {DefaultCrudRepository} from '@loopback/repository';
import {Cors, CorsRelations} from '../models';
import {CorsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CorsRepository extends DefaultCrudRepository<
  Cors,
  typeof Cors.prototype.id,
  CorsRelations
> {
  constructor(
    @inject('datasources.cors') dataSource: CorsDataSource,
  ) {
    super(Cors, dataSource);
  }
}
