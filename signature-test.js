// signature-test.js
const crypto = require('crypto');

const order_id = 'b9694a8a-7f53-4d34-b1e9-50db7c2f9387'; // samakan dengan order di DB
const status_code = '200';
const gross_amount = '66000000';
const serverKey = process.env.MIDTRANS_SERVER_KEY; // SERVER KEY KAMU

const signature = crypto
  .createHash('sha512')
  .update(order_id + status_code + gross_amount + serverKey)
  .digest('hex');

console.log(signature);
