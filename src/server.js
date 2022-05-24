<<<<<<< HEAD

import app from './app';
=======
>>>>>>> develop

import app from './app';
import prop from './config/config';
const currentConfig = prop[process.env.NODE_ENV];

import config from './config/config';
const { port } = currentConfig;
<<<<<<< HEAD
=======




>>>>>>> develop
const server = app.listen(port, () =>
  console.log(`App listening on ${port}!....`)
);

export default server;