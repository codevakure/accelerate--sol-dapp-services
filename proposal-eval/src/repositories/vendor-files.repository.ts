import {DefaultCrudRepository} from '@loopback/repository';
import {VendorFiles, VendorFilesRelations} from '../models';
import {ProposalEvalDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class VendorFilesRepository extends DefaultCrudRepository<
  VendorFiles,
  typeof VendorFiles.prototype.ID,
  VendorFilesRelations
> {
  constructor(
    @inject('datasources.proposalEval') dataSource: ProposalEvalDataSource,
  ) {
    super(VendorFiles, dataSource);
  }
}
