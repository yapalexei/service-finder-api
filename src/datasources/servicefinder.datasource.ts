import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'servicefinder',
  connector: 'postgresql',
  url: 'postgres://skymac:@localhost/service-finder',
  host: 'localhost',
  port: 5432,
  user: 'skymac',
  password: '',
  database: 'service-finder',
  debug: true,
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class ServicefinderDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'servicefinder';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.servicefinder', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
