const { cashId, cashServer } = require('../config/config');
const apiError = require('../error/apiError')
const asyncHandler = require('../middleware/asyn-await-wrapper')
const itemDetails = require('../migration/models/index')['itemDetail']
const invoiceModel = require('../migration/models/index')['invoice']
const payDetails = require('../migration/models/index')['payDetails']
const { User } = require('../migration/models');
const { Op } = require('sequelize');
const sdk = require('api')('@cashfreedocs-new/v3#246q2ilfwcazf0');



const createInvoice = asyncHandler(async (req, res) => {
    console.log('create called');
    let data = req.body;
    var randomnum = Math.floor(Math.random() * (10000 - 2123)) + 10000;
    let totalAmount = 0;
    const quantity = data.item.map(x => x.quantity)
    const itemId = data.item.map(x => x.itemid)
    const userDetail = await User.findOne({ where: { id: data.cust_id } })
    const invoiceitemdetailed = await itemDetails.findAll({
        where: {
            id: {
                [Op.in]: itemId
            }
        }
    })
    // const paymentdetailed = await payDetails.create({ customer_id: userDetail[0].id, })
    console.log(userDetail, itemId);
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
    if (invoicedata.paymentType == 1) {
        // console.log(orderlink,headerConfig);
        sdk.createPaymentLink(orderlink, headerConfig)
            .then(async data => {
                paymentlink = data
                let paydet;
                let paymentDetailResponse = paymentlink.data;
                let detailpayment = {
                    invoice_no:invoicedata.invoiceno,
                    customer_id : invoicedata.customer_id,
                    cf_link_id:paymentDetailResponse.link_id,
                    link_id:paymentDetailResponse.link_id,
                    link_status:paymentDetailResponse.link_status,
                    link_currency:paymentDetailResponse.link_currency,
                    link_amount:paymentDetailResponse.link_amount,
                    link_partial_payments:paymentDetailResponse.link_partial_payments,
                    // link_partial_amount:paymentDetailResponse.link_partial_amount,
                    link_purpose:paymentDetailResponse.link_purpose,
                    link_url:paymentDetailResponse.link_url,
                    link_expiry_time:paymentDetailResponse.link_expiry_time,
                    send_email:paymentDetailResponse.link_notify.send_email,
                    send_sms:paymentDetailResponse.link_notify.send_sms,
                   
                }
                // paymentDetailResponse['customer_id'] = invoicedata.customer_id

                console.log(detailpayment,'detail amount check');

                try{
                 paydet = await payDetails.create({ invoice_no:invoicedata.invoiceno,
                    customer_id : invoicedata.customer_id,
                    cf_link_id:paymentDetailResponse.link_id,
                    link_id:paymentDetailResponse.link_id,
                    link_status:paymentDetailResponse.link_status,
                    link_currency:paymentDetailResponse.link_currency,
                    link_amount:paymentDetailResponse.link_amount,
                    link_partial_payments:paymentDetailResponse.link_partial_payments,
                    // link_partial_amount:paymentDetailResponse.link_partial_amount,
                    link_purpose:paymentDetailResponse.link_purpose,
                    link_url:paymentDetailResponse.link_url,
                    link_expiry_time:paymentDetailResponse.link_expiry_time,
                    send_email:paymentDetailResponse.link_notify.send_email,
                    send_sms:paymentDetailResponse.link_notify.send_sms,})
                 res.status(201).send(paydet)
                }
                catch(err){
                    console.log(err,'error');
                }

                invoicedata['payment_id'] = paydet.id;
                //    invoicedata['order_id'] = 

                //    paymentDetail.save(paymentDetail,async(err, obj) => {
                //         if (err) {
                //             return res.status(400).send({ mesage: "Error in Saving Payment Link", success: false, error: err.message })
                //         }
                //         else {


                //             invoicemodel.paymentId = obj._id;
                //             invoicemodel.paymentDetail = obj._id;
                //             invoiceSchema.create(invoicemodel, (err, obj) => {
                //                 if (err) {
                //                     res.status(400).send({ message: "Can't Post Invoice", error: err.message })
                //                 }
                //                 else {
                //                     // console.log(paymentlink.data);
                //                     const data = {
                //                         message: "Added Invoice Succesfull",
                //                         succes: true,
                //                         paymentType: 1,
                //                         link: paymentlink.data.link_url,
                //                         expireIn: paymentlink.data.link_expiry_time
                //                     }
                //                     res.status(201).send(data)
                //                 }
                //             });
                //         }
                //     })

console.log(invoicedata);
            }
            )

    }
    else {

    }

    //  let invoice=await invoiceModel.create(invoicedata); 

    //  if(invoice){
    //     res.status(201).send({invoice})
    //  }
    // else{
    //     next(apiError.BadRequest("can't create invoice"))
    // }

}
)
const getAllInvoice = asyncHandler(async (req, res, next) => {
    let invoice = await invoiceModel.findAll();
    if (invoice) {
        res.status(200).send({ invoice })
    }
    else {
        next(apiError.BadRequest("can't find invoice"))
    }
}
)
module.exports = {
    createInvoice,
    getAllInvoice
}