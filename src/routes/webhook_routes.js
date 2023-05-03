const express = require('express');
const { cashfreeWebhook } = require('../controller/payment_n_order_controller');
const route = express.Router();

route.post('/payment/success',cashfreeWebhook)

module.exports = route;