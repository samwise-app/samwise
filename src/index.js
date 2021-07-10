const { app } = require('./app');
const { port, hostname } = require('./config');

app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening at ${hostname}:${port}`);
});
