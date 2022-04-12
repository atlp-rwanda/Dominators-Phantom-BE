import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './documentation/index';

const app = express();

app.get('/api/v1', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Dominators-Phantom-API!',
  });
});

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    swaggerOptions: {
      docExpansion: 'none',
      persistAuthorization: true,
    },
  })
);

export default app;
