import {DefaultCrudRepository} from '@loopback/repository';
import {ContractReq, ContractReqRelations} from '../models';
import {ContractReqDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ContractReqRepository extends DefaultCrudRepository<
  ContractReq,
  typeof ContractReq.prototype.id,
  ContractReqRelations
> {
  constructor(
    @inject('datasources.ContractReq') dataSource: ContractReqDataSource,
  ) {
    super(ContractReq, dataSource);
  }
}
