import { inject, lifeCycleObserver, LifeCycleObserver } from '@loopback/core';
import { juggler } from '@loopback/repository';

const config = {
  name: 'contractclause',
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
export class ContractclauseDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'contractclause';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.contractclause', { optional: true })
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}

