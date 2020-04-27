const Sequelize = require('sequelize');

const generateModel = (PgConn) => {
  return PgConn.define(
    'account',
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      account_number: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      balance: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        default: 0,
      },
    },
    {
      tableName: 'account',
      timestamps: false,
      underscored: true,
    }
  );
};

module.exports = { generateModel };
