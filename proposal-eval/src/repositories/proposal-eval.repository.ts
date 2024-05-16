import { DefaultCrudRepository, juggler, HasManyRepositoryFactory, repository } from '@loopback/repository';
import { ProposalEval, ProposalEvalRelations, Evaluation } from '../models';
import { ProposalEvalDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { EvaluationRepository } from "./evaluation.repository";

export class ProposalEvalRepository extends DefaultCrudRepository<
  ProposalEval,
  typeof ProposalEval.prototype.ID,
  ProposalEvalRelations
  > {
  public readonly evaluations: HasManyRepositoryFactory<Evaluation, typeof ProposalEval.prototype.ID>;
  constructor(
    @inject('datasources.proposalEval') dataSource: juggler.DataSource,
    @repository.getter('EvaluationRepository') getEvaluationRepository: Getter<EvaluationRepository>,
  ) {
    super(ProposalEval, dataSource);
    this.evaluations = this.createHasManyRepositoryFactoryFor('evaluations', getEvaluationRepository);
  }
}
