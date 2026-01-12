const snap = require('../config/midtrans');
const { Order, User } = require('../models');

exports.createSnapTransaction = async (req, res) => {
  try {
    const { order_id } = req.body;

    if (!order_id) {
      return res.status(400).json({ message: 'order_id is required' });
    }

    const order = await Order.findByPk(order_id, { include: User });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.status !== 'pending') {
      return res.status(400).json({ message: 'Order already processed' });
    }

    const parameter = {
      transaction_details: {
        order_id: String(order.id),          // ✅ PAKAI ID ORDER
        gross_amount: order.total_amount
      },
      customer_details: {
        first_name: order.User.name,
        email: order.User.email
      }
    };

    const transaction = await snap.createTransaction(parameter);

    res.json({
      token: transaction.token,
      redirect_url: transaction.redirect_url
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
