import app from './app';
(async () => {
  try {
    const server = app.listen(3000, () =>
      console.log('App listening on port 3000')
    );
    return server;
  } catch (error) {
    console.error(error);
  }
})()