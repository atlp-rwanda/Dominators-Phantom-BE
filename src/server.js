import app from './app';
import config from './config/config';

const server = app.listen(3000, () =>
  console.log('App listening on port 3000')
);

export default server;
