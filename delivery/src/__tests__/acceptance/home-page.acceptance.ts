import { Client } from '@loopback/testlab';
import { DeliveryApplication } from '../..';
import { setupApplication } from './test-helper';

describe('HomePage', () => {
  let app: DeliveryApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({ app, client } = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('exposes a default home page', async () => {
    await client
      .get('/')
      .expect(200)
      .expect('Content-Type', /text\/html/);
  });

  // it('exposes self-hosted explorer', async () => {
  //   await client
  //     .get('/acc-api/delivery-explorer/')
  //     .expect(200)
  //     .expect('Content-Type', /text\/html/)
  //     .expect(/<title>LoopBack API Explorer/);
  // });
});
