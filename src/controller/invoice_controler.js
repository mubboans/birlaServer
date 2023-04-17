const { cashId, cashServer } = require('../config/config');
const apiError = require('../error/apiError')
const asyncHandler = require('../middleware/asyn-await-wrapper')
const itemDetails = require('../migration/models/index')['itemDetail']
const invoiceModel = require('../migration/models/index')['invoice']
const payDetails = require('../migration/models/index')['payDetails']
const Users = require('../migration/models/index')['Users']
const { User,orderDetail,invoiceItems } = require('../migration/models');
const { Op } = require('sequelize');
const sdk = require('api')('@cashfreedocs-new/v3#246q2ilfwcazf0');
const axios = require('axios');
const fs = require('fs');
const pdf = require ('html-pdf')
const createPdf = ()=>{

}

const createInvoice = asyncHandler(async (req, res,next) => {
    let data = req.body;
    var randomnum = Math.floor(Math.random() * (10000 - 2123)) + 10000;
    let totalAmount = 0;
    const quantity = data.item.map(x => x.quantity)
    const itemId = data.item.map(x => x.item_id)
    const userDetail = await User.findOne({ where: { id: data.cust_id } })
    const invoiceitemdetailed = await itemDetails.findAll({
        where: {
            id: {
                [Op.in]: itemId
            }
        }
    })
    for (let i = 0; i < invoiceitemdetailed.length; i++) {
        totalAmount += invoiceitemdetailed[i].itemprice * quantity[i]
        console.log(totalAmount, 'calculated Amount', i);
    }
    let invoicedata = {
        customer_id: data.cust_id,
        invoiceno: data.invoiceno,
        invoicedate: data.invoicedate,
        paymentType: data.paymentType,
        bill_link_id: randomnum,
        totalamount: totalAmount
    }
    const headerConfig = {
        'x-client-id': cashId,
        'x-client-secret': cashServer,
        'x-api-version': '2022-09-01'
    }
    let orderlink = {
        customer_details: {
            customer_phone: userDetail.contact,
            customer_email: userDetail.email,
            customer_name: userDetail.firstName
        },
        link_auto_reminders: true,
        link_notify: { send_sms: data.link_notify.send_sms, send_email: data.link_notify.send_email },
        link_id: randomnum.toString(),
        link_amount: invoicedata.totalamount,
        link_currency: data.link_currency,
        link_purpose: data.link_purpose,
        // link_partial_payments: data.link_partial_payments,
        // link_minimum_partial_amount: data.link_minimum_partial_amount,
    }
    let paydet;
    if (invoicedata.paymentType == 1) {
        sdk.createPaymentLink(orderlink, headerConfig)
            .then(async data => {
                paymentlink = data
                let paymentDetailResponse = paymentlink.data;
                let detailpayment = {
                    invoice_no: invoicedata.invoiceno,
                    customer_id: invoicedata.customer_id,
                    cf_link_id: paymentDetailResponse.link_id,
                    link_id: paymentDetailResponse.link_id,
                    link_status: paymentDetailResponse.link_status,
                    link_currency: paymentDetailResponse.link_currency,
                    link_amount: paymentDetailResponse.link_amount,
                    link_partial_payments: paymentDetailResponse.link_partial_payments,
                    link_purpose: paymentDetailResponse.link_purpose,
                    link_url: paymentDetailResponse.link_url,
                    link_expiry_time: paymentDetailResponse.link_expiry_time,
                    send_email: paymentDetailResponse.link_notify.send_email,
                    send_sms: paymentDetailResponse.link_notify.send_sms,

                }
                console.log(detailpayment, 'detail amount check');
                try {
                    paydet = await payDetails.create(detailpayment)
                    invoicedata['payment_id'] = paydet.id;
                    let invoice = await invoiceModel.create(invoicedata);
                    let invoice_id = invoices.id
                   let detailinvoiceItem = data.item.map(item=>({invoice_id,...item}));
                      console.log('data to be inserted',detailinvoiceItem,'detail insert 163');
                    invoiceItems.bulkCreate(detailinvoiceItem)
                     .then((data)=>{
                     console.log('bulk inserted');
                      }).catch((err)=>{
                      console.log(err);
                         })
                    if (invoice) {
                        res.status(201).send({ message:"SuccessFull create invoice",success:true,status:"Success"})
                    }                  
                }
                catch (err) {
                    next(apiError.BadRequest("can't create invoice",err))
                }
            }
            )
    }
    else {
        let orderDetailing = {
            "customer_details": {
                "customer_id": invoicedata.customer_id.toString(),
                "customer_email": userDetail.email,
                "customer_phone": userDetail.contact,
                "customer_name": userDetail.firstName
            },
            "order_amount": invoicedata.totalamount,
            "order_currency": data.link_currency
        }
        const options = {
            method: 'POST',
            url: 'https://sandbox.cashfree.com/pg/orders',
            headers: headerConfig,
            data: orderDetailing
        }
        axios(options)
        .then(async (response) => {
            var d = response.data;  
            let detailorder={
                customer_id:invoicedata.customer_id,
                order_note:d.order_note,
                entity:d.entity,
                order_meta_return_url:d.order_meta.return_url,
                order_meta_notify_url:d.order_meta.order_meta_notify_url,
                order_meta_payment_methods:d.order_meta.order_meta_payment_methods,
                cf_order_id:d.cf_order_id,
                settlements_url:d.settlements.url,
                refunds_url:d.refunds.url,
                payments_url:d.payments.url,
                payment_session_id:d.payment_session_id,
                order_tags:d.order_tags,
                order_id:d.order_id,
                order_status:d.order_status,
                order_currency:d.order_currency,
                order_amount:d.order_amount,
                order_expiry_time:d.order_expiry_time
            }
            let detailpayments = {
                invoice_no: invoicedata.invoiceno,
                cf_link_id: d.cf_order_id,
                customer_id: invoicedata.customer_id,
                link_id: d.order_id,    
                link_status:d.order_status,
                link_currency:d.order_currency,
                link_amount: d.order_amount,
                link_purpose:data.link_purpose,
                link_url: d.payments.url,
                link_expiry_time: d.order_expiry_time,
            }
            let orderDetailing
            try {
                paydet =await payDetails.create(detailpayments);
                orderDetailing =await orderDetail.create(detailorder);
                invoicedata['payment_id'] = paydet.id;
                invoicedata['order_id'] = orderDetailing.id;
                let invoices = await invoiceModel.create(invoicedata); 
                let invoice_id = invoices.id
                let detailinvoiceItem = data.item.map(item=>({invoice_id,...item}));
                console.log('data to be inserted',detailinvoiceItem,'detail insert 163');
                invoiceItems.bulkCreate(detailinvoiceItem)
                .then((data)=>{
                console.log('bulk inserted');
               }).catch((err)=>{
                console.log(err);
               })
                if(invoices){
                    console.log('inserted');
                    res.status(201).send({ message:"SuccessFull create invoice",success:true,status:"Success"})
                }
            }
            catch(err){
                next(apiError.BadRequest("can't create invoice",err))
                console.log(err,'174');
            }
        }).catch((err)=>{
            console.log(err,'182');
            next(apiError.BadRequest("can't create invoice",err))
        });
    }
}
)

const updateInvoice = asyncHandler(async(req,res,next)=>{
    let id =req.query.id;
    let invyno =req.query.no;
    let data = req.body
    let totalAmount = 0;
    const quantity = data.item.map(x => x.quantity)
    const itemId = data.item.map(x => x.item_id)
    // const userDetail = await User.findOne({ where: { id: data.customer_id } })
    const invoiceitemdetailed = await itemDetails.findAll({
        where: {
            id: {
                [Op.in]: itemId
            }
        }
    })
    for (let i = 0; i < invoiceitemdetailed.length; i++) {
        totalAmount += invoiceitemdetailed[i].itemprice * quantity[i]
    }
console.log(id,invyno,data);
    let updateItem = {
        customer_id:data.customer_id,
        invoicedate:data.invoicedate,
        totalamount:totalAmount
    }
    console.log((updateItem));
    let invoice =await invoiceModel.update(updateItem,{where:{id:id}})
    console.log(invoice);
    if(invoice[0] == 1){
        let items = data.item;
        let invoiceDelete =await invoiceItems.destroy({where:{invoice_id:id}})
        
        console.log(invoiceDelete,'data deleted',items);
        let invoice_id = id
        // for(let i=0;i<items.length;i++){
            let updateItem = data.item.map((item)=>({invoice_id,...item}))
            // {
            //     item_id:items[i].item_id,
            //     quantity:quantity[i]
            // }
            console.log(updateItem,'posting data');
           await invoiceItems.bulkCreate(updateItem).then((item)=>{
            console.log('inserted succ',item);
           }).catch((err)=>{
            console.log('error',err);
           })
            console.log('updatesd Item');
            
        // }
        // invoiceItems.bulkCreate(items,{updateOnDuplicate:['item_id','quantity']}).then((data)=>{
        //     console.log('bulk updated');
        // }).catch((err)=>{
        //     console.log(err);
        // })
        
            res.status(200).send({message:"Invoice Update Succesfully",success:true,status:"Success"})
        
        console.log('0 working ');
    }
    else{
        next(apiError.BadRequest("Can't Update Successfully"))
    }

})

const deleteInvoice = async(req,res,next)=>{
const id =req.params.ids
let isInvoiceDeleted = await invoiceModel.destroy({where:{id:id}})
if(isInvoiceDeleted == 1){
    res.status(200).send({message:"Succesfully Deleted invoice",success:true,status:"Success"})
}
else{
    next(apiError.BadRequest("Can't Delete Invoice"))
}
}
const getAllInvoice = asyncHandler(async (req, res, next) => {
    let invoice = await invoiceModel.findAll({include: [
        {
          model: User,
          as:'Users'
        },{
            model:payDetails
        },{
            model:orderDetail
        },{
            model:invoiceItems
        }
      ],order: [['createdAt', 'DESC']]});
    if (invoice) {
        res.status(200).send({ invoice })
    }
    else {
        next(apiError.BadRequest("can't find invoice"))
    }
}
)
const bulkdeleteInvoice =async(req,res,next)=>{
    let ids = req.body.ids;
  try{

      let bulinvoicedeleted = await invoiceModel.destroy({where:{ id: { [Op.in]: ids }}})
      console.log(bulinvoicedeleted);
      if(bulinvoicedeleted && bulinvoicedeleted != 0){
          res.status(200).send({message:"Succesfully deleted selected invoice",success:true,status:"Success"})
      }
      else{
        next(apiError.NotFound("cant found invoice number"))
      }
  }
  catch(err){
      next(apiError.BadRequest("Can't deleted selected invoice",err))
  }
}
module.exports = {
    createInvoice,
    getAllInvoice,updateInvoice,deleteInvoice,bulkdeleteInvoice
}