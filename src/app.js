const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/product.routes');
const authRoutes = require('./routes/auth.routes');
const orderRoutes = require('./routes/order.routes');
const checkoutRoutes = require('./routes/checkout.routes');
const paymentRoutes = require('./routes/payment.routes');
const midtransRoutes = require('./routes/midtrans.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.get('/', (req, res) => {
  res.send('Backend E-Commerce API is running 🚀');
});
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use(checkoutRoutes);
app.use(paymentRoutes);
app.use('/midtrans', midtransRoutes);

module.exports = app;
