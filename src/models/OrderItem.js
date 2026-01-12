const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define('OrderItem', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },

    order_id: {
      type: DataTypes.UUID,
      allowNull: false
    },

    product_id: {
      type: DataTypes.UUID,
      allowNull: false
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'order_items'
  });
