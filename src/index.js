const { PORT } = require('./config');
const app = require('./app');
const { connect } = require('./data-layer/orm-models');

function setupPostgreSQL() {
  console.log('Connectiong to PostgreSQL...');

  return connect()
    .then((pgConn) => {
      console.log('[PG] Connected to PostgreSQL!');
    })
    .then(() => {
      setTimeout(function () {
        app.listen(PORT, () => {
          console.log(`server started on port ${PORT}`);
        });
      }, 0);
    });
}

setupPostgreSQL()
  .then(() => console.log('[INIT] Server Init Complete!'))
  .catch((err) => {
    console.error('[INIT] FATAL STARTUP ERROR: ', err);
    process.exit(1);
  });
