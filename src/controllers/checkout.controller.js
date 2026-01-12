const { Order, OrderItem, Product, sequelize } = require('../models');
const { v4: uuidv4 } = require('uuid');

exports.checkout = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const userId = req.user.id;
    const { items, shipping_address } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Items cannot be empty' });
    }

    let totalAmount = 0;

    const products = await Product.findAll({
      where: { id: items.map(i => i.product_id) }
    });

    const orderItems = items.map(item => {
      const product = products.find(p => p.id === item.product_id);
      if (!product) throw new Error('Invalid product');

      totalAmount += product.price * item.quantity;

      return {
        product_id: product.id,
        quantity: item.quantity,
        price: product.price
      };
    });

    const midtransOrderId = `ORDER-${uuidv4()}`;

    const order = await Order.create({
      user_id: userId,
      midtrans_order_id: midtransOrderId,
      total_amount: totalAmount,
      shipping_address,
      status: 'pending'
    }, { transaction: t });

    for (const item of orderItems) {
      await OrderItem.create({ order_id: order.id, ...item }, { transaction: t });
    }

    await t.commit();

    res.status(201).json({
      order_id: order.id,
      midtrans_order_id: midtransOrderId,
      total_amount: totalAmount
    });

  } catch (err) {
    await t.rollback();
    res.status(500).json({ message: err.message });
  }
};
