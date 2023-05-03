const express = require('express');
const { getAllInvoice, createInvoice, updateInvoice, deleteInvoice, bulkdeleteInvoice, createInvoicePdf } = require('../controller/invoice_controler');
const { updateAmountnStatusbyID, updatePaymentnOrderDetail, updatePaymentbyID, paymentLinkDetail } = require('../controller/payment_n_order_controller');
const route = express.Router();

route.get('/invoice/get/all/invoice',getAllInvoice)

route.get('/invoice/get/payement/detail::id',paymentLinkDetail)

route.post('/invoice/create',createInvoice)

route.put('/invoice/update/invoice',updateInvoice)

route.delete('/invoice/delete::ids', deleteInvoice)

route.post('/invoice/bulkdel',bulkdeleteInvoice)

route.put('/invoice/update/details::id',updateAmountnStatusbyID)

route.get('/invoice/get/invoicePdf::no',createInvoicePdf);

route.get('/invoice/payment/linkstatus::linkid',updatePaymentnOrderDetail)

route.put('/invoice/update/payment::id',updatePaymentbyID)



module.exports = route