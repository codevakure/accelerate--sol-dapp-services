import {DefaultCrudRepository} from '@loopback/repository';
import {SupportedFiles, SupportedFilesRelations} from '../models';
import {ProposalEvalDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SupportedFilesRepository extends DefaultCrudRepository<
  SupportedFiles,
  typeof SupportedFiles.prototype.ID,
  SupportedFilesRelations
> {
  constructor(
    @inject('datasources.proposalEval') dataSource: ProposalEvalDataSource,
  ) {
    super(SupportedFiles, dataSource);
  }
}
