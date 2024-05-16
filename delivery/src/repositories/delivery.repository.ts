import {DefaultCrudRepository} from '@loopback/repository';
import {Delivery, DeliveryRelations} from '../models';
import {DeliveryDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DeliveryRepository extends DefaultCrudRepository<
  Delivery,
  typeof Delivery.prototype.id,
  DeliveryRelations
> {
  constructor(
    @inject('datasources.delivery') dataSource: DeliveryDataSource,
  ) {
    super(Delivery, dataSource);
  }
}
