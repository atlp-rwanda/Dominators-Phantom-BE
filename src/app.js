/* eslint-disable import/no-named-as-default */
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';
import globalErrorHandler from './controllers/errorController';
import swaggerDocument from './documentation/index';
import routes from './routes/index';

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    backend: {
      loadPath: './locales/{{lng}}/translation.json',
    },
  });

app.use(middleware.handle(i18next));

app.get('/api/v1', (req, res) => {
  res.status(200).json({
    message: req.t('welcome_message'),
  });
});
app.use('/uploads', express.static('uploads'));
app.use('/api/v1/', routes);

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

//ERROR HANDLING MIDDLEWARE
app.use(globalErrorHandler);
export default app;
