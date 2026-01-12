const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define('Order', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },

    user_id: {
      type: DataTypes.UUID, // samakan dengan User.id
      allowNull: false
    },

    status: {
      type: DataTypes.ENUM(
        'pending',
        'paid',
        'shipped',
        'completed',
        'cancelled',
        'expired'
      ),
      defaultValue: 'pending'
    },
    total_amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    shipping_address: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'orders'
  });
