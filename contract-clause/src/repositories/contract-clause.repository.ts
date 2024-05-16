import {DefaultCrudRepository} from '@loopback/repository';
import {ContractClause, ContractClauseRelations} from '../models';
import {ContractclauseDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ContractClauseRepository extends DefaultCrudRepository<
  ContractClause,
  typeof ContractClause.prototype.id,
  ContractClauseRelations
> {
  constructor(
    @inject('datasources.contractclause') dataSource: ContractclauseDataSource,
  ) {
    super(ContractClause, dataSource);
  }
}
