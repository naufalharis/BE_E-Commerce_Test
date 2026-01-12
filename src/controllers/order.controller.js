const { Order, OrderItem, Product } = require('../models');

exports.checkout = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items } = req.body;
    /**
     * items = [
     *   { product_id: 1, quantity: 2 },
     *   { product_id: 3, quantity: 1 }
     * ]
     */

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Items required' });
    }

    // 1. Buat order
    const order = await Order.create({
      user_id: userId,
      status: 'PENDING',
    });

    let total = 0;

    // 2. Loop items
    for (const item of items) {
      const product = await Product.findByPk(item.product_id);
      if (!product) {
        return res.status(404).json({
          message: `Product ID ${item.product_id} not found`,
        });
      }

      const subtotal = product.price * item.quantity;
      total += subtotal;

      await OrderItem.create({
        order_id: order.id,
        product_id: product.id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    // 3. Update total
    order.total_price = total;
    await order.save();

    res.status(201).json({
      message: 'Checkout success',
      order_id: order.id,
      total_price: total,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
