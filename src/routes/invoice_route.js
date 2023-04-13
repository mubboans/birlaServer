const express = require('express');
const { getAllInvoice, createInvoice } = require('../controller/invoice_controler');
const route = express.Router();

route.get('/invoice/get/all/invoice',getAllInvoice)

route.post('/invoice/create',createInvoice)


module.exports = route