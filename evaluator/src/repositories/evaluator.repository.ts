import {DefaultCrudRepository} from '@loopback/repository';
import {Evaluator, EvaluatorRelations} from '../models';
import {EvaluatorDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class EvaluatorRepository extends DefaultCrudRepository<
  Evaluator,
  typeof Evaluator.prototype.nda,
  EvaluatorRelations
> {
  constructor(
    @inject('datasources.evaluator') dataSource: EvaluatorDataSource,
  ) {
    super(Evaluator, dataSource);
  }
}
