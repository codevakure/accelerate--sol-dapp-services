import { BootMixin } from '@loopback/boot';
import { ApplicationConfig } from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import { RepositoryMixin } from '@loopback/repository';
import { RestApplication } from '@loopback/rest';
import { ServiceMixin } from '@loopback/service-proxy';
import * as path from 'path';
import { MySequence } from './sequence';
import * as dotenv from 'dotenv';
import { CorsDataSource } from './datasources';
export { ApplicationConfig };
export class CorsSvcApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Initialize dotenv
    dotenv.config();
    // add the environment-specifc values to the datasource

    this.bind('datasources.config.cors').to({
      name: 'cors',
      connector: 'mongodb',
      hostname: process.env.MONGODB_HOST,
      port: process.env.MONGODB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.MONGODB_DB,
      ssl: process.env.DB_USER,
      authSource: process.env.DB_AUTH_SOURCE
    });
    this.bind('datasources.cors').toClass(CorsDataSource);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.bind(RestExplorerBindings.CONFIG).to({
      // path: '/acc-api/cors-explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
