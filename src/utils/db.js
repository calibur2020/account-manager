const pgConnectionString = require('pg-connection-string');
const Sequelize = require('sequelize');

function uriToSequelizeParameters(pgUri) {
  if (typeof pgUri !== 'string' || pgUri.length < 10) {
    console.error('Invalid Postgres URI!');
    throw new Error('Invalid Postgres URI');
  }
  const mdObj = pgConnectionString.parse(pgUri);
  const conn = {
    host: mdObj.host,
    port: parseInt(mdObj.port || '5432', 10),
    dialect: 'postgres',
    operatorsAliases: false,
    logging: console.log,
  };

  const pgSeqObj = {
    dbName: mdObj.database,
    dbUsername: mdObj.user,
    dbPassword: mdObj.password,
    connectionObject: conn,
  };
  if (
    !conn.host ||
    isNaN(conn.port) ||
    conn.port < 0 ||
    !pgSeqObj.dbName ||
    !pgSeqObj.dbUsername ||
    !pgSeqObj.dbPassword
  ) {
    console.error('Invalid Postgres URI!');
    throw new Error('Invalid Postgres URI');
  }

  if (typeof mdObj.max !== 'string' && typeof mdObj.min !== 'string') {
  } else {
    conn.pool = {
      max: parseInt(mdObj.max, 10),
      min: mdObj.min ? parseInt(mdObj.min, 10) : 0,
      acquire: 30000,
      idle: 10000,
    };
    if (isNaN(conn.pool.max) || conn.pool.max < 1) {
      console.warn(
        'Invalid pg uri max pool value (should be uint, got NaN), defaulting to max pool of size 1 and min of 0'
      );
      conn.pool.max = 1;
      conn.pool.min = 0;
    }
    if (isNaN(conn.pool.min) || conn.pool.min < 0) {
      console.warn(
        'Invalid pg uri min pool value (should be uint, got NaN), defaulting to min pool of size 0'
      );
      conn.pool.min = 0;
    }
  }
  return pgSeqObj;
}
exports.uriToSequelizeParameters = uriToSequelizeParameters;

exports.getSequelizeForPostgresURI = (postgresUri) => {
  const pgSeqObj = uriToSequelizeParameters(postgresUri); // throws error if invalid
  return new Sequelize(
    pgSeqObj.dbName,
    pgSeqObj.dbUsername,
    pgSeqObj.dbPassword,
    pgSeqObj.connectionObject
  );
};
