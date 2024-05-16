import {DefaultCrudRepository} from '@loopback/repository';
import {Instruction, InstructionRelations} from '../models';
import {InstructionDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class InstructionRepository extends DefaultCrudRepository<
  Instruction,
  typeof Instruction.prototype.id,
  InstructionRelations
> {
  constructor(
    @inject('datasources.instruction') dataSource: InstructionDataSource,
  ) {
    super(Instruction, dataSource);
  }
}
