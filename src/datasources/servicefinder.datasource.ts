import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
console.log(process.env.HOST);
const config = {
  name: 'servicefinder',
  connector: 'postgresql',
  host: process.env.POSTGRES_HOST ?? 'localhost',
  port: process.env.POSTGRES_PORT ?? 5432,
  user: process.env.POSTGRES_USER ?? 'postgres',
  password: process.env.POSTGRES_PASSWORD ?? 'pass',
  database: process.env.POSTGRES_DB ?? 'service-finder',
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
