const express = require('express');
const { getAllInvoice, createInvoice, updateInvoice, deleteInvoice, bulkdeleteInvoice } = require('../controller/invoice_controler');
const route = express.Router();

route.get('/invoice/get/all/invoice',getAllInvoice)

route.post('/invoice/create',createInvoice)

route.put('/invoice/update/invoice',updateInvoice)

route.delete('/invoice/delete::ids', deleteInvoice)

route.post('/invoice/bulkdel',bulkdeleteInvoice)

module.exports = route