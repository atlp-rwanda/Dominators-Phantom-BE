import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './documentation/index';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';


const app = express();

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
app.get('/api/v1', (req, res) => {
  res.status(200).json({
    message: "Welcome to Dominators-Phantom-API!",
  });
});



app.get('/' ,  (req, res) =>  {
 
  res.send({message: req.t('first_message')})
console.log(req)
})

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
