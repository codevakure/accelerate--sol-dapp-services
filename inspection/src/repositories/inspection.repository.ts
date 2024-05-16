import {DefaultCrudRepository} from '@loopback/repository';
import {Inspection, InspectionRelations} from '../models';
import {InspectionDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class InspectionRepository extends DefaultCrudRepository<
  Inspection,
  typeof Inspection.prototype.id,
  InspectionRelations
> {
  constructor(
    @inject('datasources.inspection') dataSource: InspectionDataSource,
  ) {
    super(Inspection, dataSource);
  }
}
