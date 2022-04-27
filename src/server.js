<<<<<<< HEAD
import app from './app';
import prop from './config/config';
const currentConfig = prop[process.env.NODE_ENV];

const { port } = currentConfig;
=======
import app from '../src/app';
import config from './config/config';

const currentConfig = config[process.env.NODE_ENV];
const { port } = currentConfig;

>>>>>>> d88ba07... Translated i18next

const server = app.listen(port, () =>
  console.log(`App listening on ${port}!....`)
);

export default server;