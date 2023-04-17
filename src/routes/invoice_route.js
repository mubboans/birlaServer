const express = require('express');
const { getAllInvoice, createInvoice, updateInvoice } = require('../controller/invoice_controler');
const route = express.Router();

route.get('/invoice/get/all/invoice',getAllInvoice)

route.post('/invoice/create',createInvoice)

route.put('/invoice/update/invoice',updateInvoice)

module.exports = route