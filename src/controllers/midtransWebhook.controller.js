const crypto = require('crypto');
const { Order, Payment } = require('../models');

module.exports = async (req, res) => {
  try {
    const {
      order_id,
      status_code,
      gross_amount,
      transaction_status,
      payment_type,
      transaction_id,
      signature_key
    } = req.body;

    const serverKey = process.env.MIDTRANS_SERVER_KEY;

    const expectedSignature = crypto
      .createHash('sha512')
      .update(order_id + status_code + gross_amount + serverKey)
      .digest('hex');

    if (signature_key !== expectedSignature) {
      console.error('INVALID SIGNATURE', {
        expectedSignature,
        signature_key,
        payload: order_id + status_code + gross_amount
      });

      return res.status(403).json({ message: 'Invalid signature' });
    }

    const order = await Order.findOne({
      where: { id: order_id }
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    let status = 'pending';
    if (['capture', 'settlement'].includes(transaction_status)) {
      status = 'paid';
    } else if (['cancel', 'deny'].includes(transaction_status)) {
      status = 'cancelled';
    } else if (transaction_status === 'expire') {
      status = 'expired';
    }

    await order.update({ status });

    await Payment.upsert({
      orderId: order.id,
      transaction_id,
      transaction_status,
      payment_type,
      gross_amount: parseInt(gross_amount),
      raw_response: req.body
    });

    return res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    console.error('MIDTRANS WEBHOOK ERROR:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
