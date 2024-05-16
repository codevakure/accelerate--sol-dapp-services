import { inject, lifeCycleObserver, LifeCycleObserver } from '@loopback/core';
import { juggler } from '@loopback/repository';

const config = {
  name: 'inspection',
  connector: 'mongodb',
  url: '',
  host: '3.83.144.202',
  port: 27017,
  user: 'svcAccelerator',
  password: 'C0nn2892H3re',
  database: 'accelerate-ap',
  useNewUrlParser: true

};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class InspectionDataSource extends juggler.DataSource implements LifeCycleObserver {
  static dataSourceName = 'inspection';
  static readonly defaultConfig = config;
  constructor(
    @inject('datasources.config.inspection', { optional: true })
    dsConfig: any = config,
  ) {
    super(dsConfig);
  }
}
