import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './documentation/index';
<<<<<<< HEAD
import cors from 'cors';

import { appRoutes } from './routes'
=======
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';
>>>>>>> d88ba07... Translated i18next

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

<<<<<<< HEAD
app.use('', appRoutes);
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
>>>>>>> d88ba07... Translated i18next

app.use(middleware.handle(i18next));
app.get('/api/v1', (req, res) => {
  res.status(200).json({
    message: req.t('welcome_message')
  });
  console.log(req.t())

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
