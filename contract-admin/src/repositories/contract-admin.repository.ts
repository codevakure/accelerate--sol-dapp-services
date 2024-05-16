import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ContractAdminDataSource} from '../datasources';
import {ContractAdmin, ContractAdminRelations} from '../models';

export class ContractAdminRepository extends DefaultCrudRepository<
  ContractAdmin,
  typeof ContractAdmin.prototype.id,
  ContractAdminRelations
  > {
  constructor(
    @inject('datasources.contract_admin') dataSource: ContractAdminDataSource,
  ) {
    super(ContractAdmin, dataSource);
  }
}
