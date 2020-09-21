import {ApplicationConfig} from '@loopback/core';
import {ServiceFinderApiApplication} from './application';
export {ServiceFinderApiApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new ServiceFinderApiApplication(options);
  await app.boot();
  await app.migrateSchema();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running here: ${url}`);
  console.log(`Try: ${url}/ping`);

  return app;
}
