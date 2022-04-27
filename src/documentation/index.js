import welcome from './welcome';
import { user, userDefinition } from './user';

const paths = { ...welcome, ...user };

const definitions = { ...userDefinition };

const config = {
  swagger: '2.0',
  info: {
    title: 'Dominators Phantom API ',
    description: 'This is team project,Dominators team',
    version: '1.0.0',
    contact: {
      name: 'Phantom Developers',
      email: 'ericjohn415@gmail.com',
      url: 'localhost:3000/api/v1/api-docs',
    },
    license: {
      name: 'Apache 2.0',
      url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },

  schemes: ['HTTP', 'HTTPS'],

  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
    ApiKeyAuth: {
      type: 'apiKey',
      name: 'refreshToken',
      in: 'header',
    },
  },

  servers: [
    {
      url: 'http://localhost:3000',
      name: 'DEV',
    },
  ],

  paths,
  definitions,
};

export default config;
