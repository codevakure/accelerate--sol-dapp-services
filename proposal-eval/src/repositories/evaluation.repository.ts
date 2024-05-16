import { DefaultCrudRepository } from '@loopback/repository';
import { Evaluation, EvaluationRelations } from '../models';
import { ProposalEvalDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class EvaluationRepository extends DefaultCrudRepository<
  Evaluation,
  typeof Evaluation.prototype.ID,
  EvaluationRelations
  > {
  constructor(
    @inject('datasources.proposalEval') dataSource: ProposalEvalDataSource,
  ) {
    super(Evaluation, dataSource);
  }
}
