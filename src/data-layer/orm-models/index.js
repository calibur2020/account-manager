const { POSTGRES_URI } = require('../../config');
const { pgMigrate } = require('../pg-migrations');
const { getSequelizeForPostgresURI } = require('../../utils/db');
const PgConn = getSequelizeForPostgresURI(POSTGRES_URI);
const Account = require('./Account').generateModel(PgConn);

function connect() {
  console.log('pg connection ok');
  return PgConn.authenticate()
    .then(pgMigrate)
    .then(() => PgConn);
}

function getPgConn() {
  return PgConn;
}
module.exports = { Account, getPgConn, connect };
