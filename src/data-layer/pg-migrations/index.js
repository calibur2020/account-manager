const { POSTGRES_URI } = require('../../config');
const { dbUtils } = require('../../utils');
const { migrate } = require('postgres-migrations');
const pgSeqObj = dbUtils.uriToSequelizeParameters(POSTGRES_URI);
exports.pgMigrate = async () => {
  await migrate(
    {
      database: pgSeqObj.dbName,
      user: pgSeqObj.dbUsername,
      password: pgSeqObj.dbPassword,
      host: pgSeqObj.connectionObject.host,
      port: pgSeqObj.connectionObject.port,
    },
    'src/data-layer/pg-migrations/migrations/'
  );
};
