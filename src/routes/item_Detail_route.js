const express = require('express');
const {getAllItem, createInvoiceItem, updateItembyId, deleteInvoiceItem} = require('../controller/item_Detail_controller');
const route = express.Router();

route.post('/item/create',createInvoiceItem);
route.patch('/update/item::ids',updateItembyId)

route.get('/item/all' , getAllItem);
 
route.delete('/delete/item::ids',deleteInvoiceItem)

module.exports = route