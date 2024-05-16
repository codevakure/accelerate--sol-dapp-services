import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {RestExplorerBindings, RestExplorerComponent} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import * as dotenv from 'dotenv';
import * as path from 'path';
import {ContractAdminDataSource} from './datasources';
import {MySequence} from './sequence';
export {ApplicationConfig};
export class ContractAdminApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Initialize dotenv
    dotenv.config();

    // add the environment-specifc values to the datasource
    this.bind('datasources.config.contract_admin').to({
      name: 'contract_admin',
      connector: 'mongodb',
      hostname: process.env.MONGODB_HOST,
      port: process.env.MONGODB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.MONGODB_DB,
      authSource: process.env.DB_AUTH_SOURCE

    });
    this.bind('datasources.contract_admin').toClass(ContractAdminDataSource);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.bind(RestExplorerBindings.CONFIG).to({
      // path: '/acc-api/contract-admin-explorer',
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
