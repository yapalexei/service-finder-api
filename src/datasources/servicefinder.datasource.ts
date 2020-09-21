import {inject, lifeCycleObserver, LifeCycleObserver, bind, BindingScope} from '@loopback/core';
import {juggler} from '@loopback/repository';
// const config = {
//   name: 'servicefinder',
//   connector: 'postgresql',
//   host: process.env.POSTGRES_HOST ?? 'localhost',
//   port: process.env.POSTGRES_PORT ?? 5432,
//   user: process.env.POSTGRES_USER ?? 'postgres',
//   password: process.env.POSTGRES_PASSWORD ?? 'pass',
//   database: process.env.POSTGRES_DB ?? 'service-finder',
// };
const config = {
  name: 'servicefinder',
  connector: 'memory',
  file: "tempData.json",
}
// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class ServicefinderDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = config.name;
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.' + config.name, {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
