import {DefaultCrudRepository} from '@loopback/repository';
import {Form, FormRelations} from '../models';
import {FormDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class FormRepository extends DefaultCrudRepository<
  Form,
  typeof Form.prototype.id,
  FormRelations
> {
  constructor(
    @inject('datasources.form') dataSource: FormDataSource,
  ) {
    super(Form, dataSource);
  }
}
