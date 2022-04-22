import app from './app';
import config from './config/config';


const { port } = config;
// console.log(port);

const server = app.listen(port, () =>
  console.log(`App listening on ${port}!....`)
);

export default server;
