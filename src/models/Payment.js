const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define(
    'Payment',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },

      orderId: {
        type: DataTypes.UUID,
        allowNull: false
      },

      transaction_id: {
        type: DataTypes.STRING,
        allowNull: false
      },

      transaction_status: {
        type: DataTypes.STRING,
        allowNull: false
      },

      payment_type: {
        type: DataTypes.STRING
      },

      gross_amount: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      raw_response: {
        type: DataTypes.JSONB
      }
    },
    {
      tableName: 'payments'
    }
  );
