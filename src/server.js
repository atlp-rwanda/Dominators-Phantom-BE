
import app from './app';

const currentConfig = config[process.env.NODE_ENV];
const { port } = currentConfig;
const server = app.listen(port, () =>
  console.log(`App listening on ${port}!....`)
);

export default server;