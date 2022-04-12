import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './documentation/index';
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
import cors from 'cors';

import { appRoutes } from './routes'
=======
>>>>>>> d88ba07 (Translated i18next)
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
>>>>>>> 3ede931 (crud route tests)

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    backend: {
      loadPath: './locales/{{lng}}/translation.json',
    },
  });

<<<<<<< HEAD
app.use(middleware.handle(i18next));
<<<<<<< HEAD

app.get('/api/v1', (req, res) => {
  res.status(200).json({
    message: req.t('welcome_message'),
  });
});

app.use('/api/v1/', routes);
=======
=======
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
>>>>>>> d88ba07 (Translated i18next)
app.get('/api/v1', (req, res) => {
  res.status(200).json({
    message: req.t('welcome_message')
  });
  console.log(req.t())

});
app.use('/api/v1', appRoutes);

>>>>>>> 3ede931 (crud route tests)

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

<<<<<<< HEAD
<<<<<<< HEAD
//ERROR HANDLING MIDDLEWARE
app.use(globalErrorHandler);

export default app
=======
=======
>>>>>>> d88ba07 (Translated i18next)

export default app;
>>>>>>> 3ede931 (crud route tests)
