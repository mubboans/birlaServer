const { cashId, cashServer } = require('../config/config');
const apiError = require('../error/apiError')
const asyncHandler = require('../middleware/asyn-await-wrapper')
const itemDetails = require('../migration/models/index')['itemDetail']
const invoiceModel = require('../migration/models/index')['invoice']
const payDetails = require('../migration/models/index')['payDetails']
const Users = require('../migration/models/index')['Users']
const { User,orderDetail,invoiceItems,invoicePayementMethod,partialPaymentDetail } = require('../migration/models');
const { Op } = require('sequelize');
const sdk = require('api')('@cashfreedocs-new/v3#246q2ilfwcazf0');
const axios = require('axios');
const fs = require('fs')
const path = require('path')
const ejs = require('ejs');
const pdf = require ('html-pdf')
const nodemailer = require("nodemailer");
const Mailgen = require('mailgen');
const createPdf = ()=>{
}

const createInvoice = asyncHandler(async (req, res,next) => {
    let reqdata = req.body;
    console.log(reqdata,'req.body');
    var randomnum = Math.floor(Math.random() * (10000 - 2123)) + 10000;
    let totalAmount = 0;
    const quantity = reqdata.item.map(x => x.quantity)
    const itemId = reqdata.item.map(x => x.item_id)
    const userDetail = await User.findOne({ where: { id: reqdata.cust_id } })
    const invoiceitemdetailed = await itemDetails.findAll({
        where: {
            id: {
                [Op.in]: itemId
            }
        }
    })
    console.log(invoiceitemdetailed,'invoice item');
    let tabdata=[
    //     {
    //     ItemName:String,
    //     ItemPrice:Number,
    //     ItemQuantity:Number
    // }
]
    for(let j= 0;j<invoiceitemdetailed.length; j++){
        let obj={
            ItemName:invoiceitemdetailed[j].itemname,
            ItemPrice : invoiceitemdetailed[j].itemprice,
            ItemQuantity : quantity[j]
        }
        tabdata.push(obj);
    }
    for (let i = 0; i < invoiceitemdetailed.length; i++) {
        totalAmount += invoiceitemdetailed[i].itemprice * quantity[i]
        // console.log(totalAmount, 'calculated Amount', i);
    }
    // let testAccount = await nodemailer.createTestAccount();
    let config ={
        service:'gmail',
        auth:{
            user:'tpsmubashir@gmail.com',
            pass:'prfvbhbobomzlztc'
        }
    }
    let transporter = nodemailer.createTransport(config);
    let mailGenerator = new Mailgen({theme:"default",product:{
        name:'Mailgen',link:'https://mailgen.js/'
    }});
    var email = {
        body: {
            name: 'Created Invoice Succesfully',
            intro: 'Your invoice generated.',
            table:{
               
                data:tabdata
            }, 
            action: {
                instructions: `Your Total Amount For invoice is ${totalAmount}`,
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Confirm your account',
                    link: 'https://google.com'
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    };
    let mail =mailGenerator.generate(email);
    let message = {
        from:'tpsmubashir@gmail.com',
        to:userDetail.email,
        subject:"Invoice Created",
        html:mail
    }
    transporter.sendMail(message).then(()=>{
    console.log(tabdata,'tab data check');
        console.log('Mail send Succfully 81');
    }).catch((err)=>{
        console.log(err,'83');
    })
    //   let message = {
    //     from: 'Sender Name <sender@example.com>',
    //     to: 'Recipient <recipient@example.com>',
    //     subject: 'Nodemailer is unicode friendly ✔',
    //     text: 'Hello to myself!',
    //     html: '<p><b>Hello</b> to myself!</p>'
    // };

    //   let info = await transporter.sendMail({
    //     from: '"Fred Foo 👻" <foo@example.com>', // sender address
    //     to: "bar@example.com, baz@example.com", // list of receivers
    //     subject: "Hello ✔", // Subject line
    //     text: "Hello world?", // plain text body
    //     html: "<b>Hello world?</b>", // html body
    //   });
    let invoicedata = {
        customer_id: reqdata.cust_id,
        invoiceno: reqdata.invoiceno,
        invoicedate: reqdata.invoicedate,
        paymentType: reqdata.paymentType,
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
        link_notify: { send_sms: reqdata.link_notify.send_sms, send_email: reqdata.link_notify.send_email },
        link_id: randomnum.toString(),
        link_amount: invoicedata.totalamount,
        link_currency: reqdata.link_currency,
        link_purpose: reqdata.link_purpose,
        link_partial_payments: reqdata.link_partial_payments,
        link_minimum_partial_amount: reqdata.link_minimum_partial_amount,
    }
    let paydet;
    if (invoicedata.paymentType == 1) {
        console.log(orderlink,'orderLink check');
        sdk.createPaymentLink(orderlink, headerConfig)
            .then(async data => {
                paymentlink = data
                let paymentDetailResponse = paymentlink.data;
                console.log(paymentDetailResponse,'detail response');
                let detailpayment = {
                    invoice_no: invoicedata.invoiceno,
                    customer_id: invoicedata.customer_id,
                    cf_link_id: paymentDetailResponse.link_id,
                    link_id: paymentDetailResponse.link_id,
                    link_status: paymentDetailResponse.link_status,
                    link_currency: paymentDetailResponse.link_currency,
                    link_amount: paymentDetailResponse.link_amount,
                    link_partial_payments: paymentDetailResponse.link_partial_payments,
                    link_partial_amount:paymentDetailResponse.link_minimum_partial_amount   ,
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
                    // if(detailpayment.link_partial_payments == true){
                    //     let parpaydet={
                    //         payment_id:paydet.id,
                    //         amount:0,
                    //         payment_date:0
                    //     }
                    //     let partialPayDe = await partialPaymentDetail.create(parpaydet)
                    //     console.log(partialPayDe,'partial created');
                    // }
                    let invoice = await invoiceModel.create(invoicedata);
                    let invoice_id = invoice.id
                   let detailinvoiceItem = reqdata.item.map(item=>({invoice_id,...item}));
                      console.log('data to be inserted',detailinvoiceItem,'detail insert 163');
                    invoiceItems.
                    Create(detailinvoiceItem)
                     .then((data)=>{
                     console.log('bulk inserted');
                      }).catch((err)=>{
                      console.log(err);
                         })
                    if (invoice) {
                        res.status(201).send({paymentType:1,
                            link: paymentlink.data.link_url,
                            expireIn: paymentlink.data.link_expiry_time,
                            message:"SuccessFull create invoice",
                            success:true,status:"Success"})
                    }                  
                }
                catch (err) {
                    console.log(err,'err 122');
                    next(apiError.BadRequest("can't create invoice",err))
                }
            }
            ).catch(err=> console.log(err,'Error'))
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
            "order_currency": reqdata.link_currency
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
                link_purpose:reqdata.link_purpose,
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
                let detailinvoiceItem = reqdata.item.map(item=>({invoice_id,...item}));
                let payemenyMethodType = reqdata.methodtype.map((x)=>({invoice_id:invoice_id,type:x}))
                
                console.log('data to be inserted',detailinvoiceItem,payemenyMethodType,'detail insert 163');


                invoicePayementMethod.bulkCreate(payemenyMethodType).then((data)=>{
                    console.log('183 payment insert');
                }).catch((err)=>{
                    console.log(err)
                })
                
                invoiceItems.bulkCreate(detailinvoiceItem)
                .then((data)=>{
                console.log('bulk inserted 190');
               }).catch((err)=>{
                console.log(err);
               })
                if(invoices){
                    console.log('inserted');
                    res.status(201).send({paymentType:2,
                        message:"SuccessFull create invoice",
                        success:true,
                        payment_session_id:d.payment_session_id,
                        status:"Success"})
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

const createInvoicePdf=async(req,res,next)=>{
    console.log('get called');
    let no = req.params.no;
    let data = await invoiceModel.findOne({include: [
        {
          model: User,
          as:'Users'
        },{
            model:payDetails
        },{
            model:orderDetail
        },{
            model:invoiceItems,
             include: [
                { model: itemDetails,
                as:'items' },
              ],
        }
        ,{
            model:invoicePayementMethod
        }
      ],where:{ invoiceno: no} })
      
      const detailed = {
        id:data.id,
        name: data.Users.firstName,
        email: data.Users.email,
        contact: data.Users.contact,
        address: data.Users.addressLine1,
        address2:data.Users.addressLine2,
        pincode: data.Users.pincode,
        city:data.Users.city,
        state:data.Users.state,
        country:data.Users.country,
        items: data.invoiceItems,
        inno: data.invoiceno,
        amount: data.totalamount,
        indate: data.invoicedate,
        itemlength: data.invoiceItems.length,
        createddate: data.createdAt
    }
    let option={format:"Letter"}
    const filePath = __filename;
    const dirPath = path.dirname(filePath);
    const pdfdir = path.join(dirPath, '..', 'pdf')
    const viewFilePath = path.join(dirPath, '..', 'views', 'invoices.ejs');
    
    const itemdet = data.invoiceItems
    // res.send(itemdet.items)
    console.log(itemdet,'itemdetail',detailed);

    const html = await ejs.renderFile(viewFilePath,{ detail: detailed, allitem: detailed.items });
    // console.log('file path',viewFilePath);

    pdf.create(html,option).toFile(`${pdfdir}/data_${data.invoiceno}.pdf`,(err,succ)=>{
        if(err) {
            return console.log(err,'error occures');
        }
        else{
            const viewFilePath = path.join(dirPath, '..', 'pdf',`data_${data.invoiceno}.pdf`);
            fs.readFile(viewFilePath, (err, dataobj) => {
                if (err) {
                  console.error(err);
                  next(apiError.BadRequest("Can't generate pdf",err))
                  return;
                } 
            else{
                res.setHeader('Content-Type', 'application/pdf'),
                res.setHeader('Content-Disposition', `attachment; filename="data_${data.invoiceno}.pdf"`);
                res.send(dataobj);
            }
            }
            )
            console.log(succ,'succss');
        }
    })
}
const updateInvoice = asyncHandler(async(req,res,next)=>{
    let id =req.query.id;
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
console.log(id,data);
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
                
            console.log(updateItem,'posting data');
           await invoiceItems.bulkCreate(updateItem).then((item)=>{
            console.log('inserted succ',item);
           }).catch((err)=>{
            console.log('error',err);
           })
            console.log('updatesd Item');
            
            res.status(200).send({message:"Invoice Update Succesfully",success:true,status:"Success"})
        
        console.log('0 working ');
    }
    else{
        next(apiError.BadRequest("Can't Update Invoice"))
    }

})

const deleteInvoice = async(req,res,next)=>{
const id =req.params.ids
try{
    let itemDestroy = await invoiceItems.destroy({where:{invoice_id:id}})
    let methodtypeDestroy = await invoicePayementMethod.destroy({where:{invoice_id:id}})
    let isInvoiceDeleted = await invoiceModel.destroy({where:{id:id}})
    if(isInvoiceDeleted == 1){
        res.status(200).send({message:"Succesfully Deleted invoice",success:true,status:"Success"})
    }
}
catch(e){
    next(apiError.BadRequest("Can't Delete Invoice",e))
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
            model:invoiceItems,
            include: [
                { model: itemDetails,as:'items' },
              ],
        }
        ,{
            model:invoicePayementMethod
        }
      ],order: [['createdAt', 'DESC']]});
    if (invoice) {
        // res.status(200).send({message invoice })
        res.status(200).send({message:"Succesfully get invoice",success:true,status:"Success",data:invoice})
    }
    else {
        next(apiError.BadRequest("can't find invoice"))
    }
}
)
const bulkdeleteInvoice =async(req,res,next)=>{
    let ids = req.body.ids;
    if(ids.length > 3){
        next(apiError.BadRequest("Invoice length should be less than 3"))
    }
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
    getAllInvoice,updateInvoice,deleteInvoice,bulkdeleteInvoice,createInvoicePdf
}