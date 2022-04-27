import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';
import cors from 'cors';
import middleware from 'i18next-http-middleware';
import globalErrorHandler from './controllers/errorController';
import routes from './routes/index';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('', appRoutes);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    backend: {
      loadPath: './locales/{{lng}}/translation.json'
    }
  })

app.use(middleware.handle(i18next));
app.use('', appRoutes);
app.get('/api/v1', (req, res) => {
  res.status(200).json({
    message: req.t('welcome_message'),
  });
});

app.use('/api/v1/', routes);
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
app.use('/api/v1', appRoutes);

// bodyParser
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: "true" }));
app.use(bodyParser.json({ type: "application/vnd.api+json" }));



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
