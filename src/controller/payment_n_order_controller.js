const { where } = require('sequelize');
const { cashId, cashServer } = require('../config/config');
const apiError = require('../error/apiError');
const { orderDetail, payDetails, partialPaymentDetail } = require('../migration/models');
const sdk = require('api')('@cashfreedocs-new/v3#he81m7ldwtny5h');
const updateAmountnStatusbyID = async (req, res, next) => {
    let orderid = req.params.id;
    let updatedData = req.body;
    console.log('update called', updatedData);
    try {
        let updateOrderDetail = await orderDetail.update(
            { transactionId: updatedData.transactionId, link_amount_paid: updatedData.amount, order_status: updatedData.status },
            { where: { order_id: orderid } }
        )
        let updatePaymentDetail = await payDetails.update(
            { link_status: updatedData.status, link_amount_paid: updatedData.amount },
            { where: { link_id: orderid } });
        if (updateOrderDetail[0] == 1 || updatePaymentDetail[0] == 1) {
            res.status(200).send({ message: "Update detail succesfully", success: true, status: "Success" })
        }
    }
    catch (e) {
        next(apiError.BadRequest("Can't update invoice", e))
    }
}
const updatePaymentnOrderDetail = async (req, res, next) => {
    let linkid = req.params.linkid;
    const configdata = {
        link_id: linkid,
        'x-client-id': cashId,
        'x-client-secret': cashServer,
        'x-api-version': '2022-09-01'
    }
    sdk.server('https://sandbox.cashfree.com/pg');
    sdk.getPaymentLinkDetails(configdata)
        .then(({ data }) => res.status(200).send({ message: 'Successfully Fetch Status', success: true, data: data }))
        .catch(err => next(apiError.BadRequest('Failed to Fetch Status', err)));
}

const cashfreeWebhook = async (req, res, next) => {
    const ts = req.headers["x-webhook-timestamp"]
    const signature = req.headers["x-webhook-signature"]
    let reqbody = req.body
    let order = reqbody.data.order;
    console.log(reqbody, 'data check', ts, signature, order, reqbody.data.payment);
    if (reqbody && order.order_tags != null && reqbody.data.payment.payment_status == 'SUCCESS')  {
        let getPayDetail = await payDetails.findOne({ where: { link_id: order.order_tags.link_id } })
        console.log(getPayDetail, 'get detail', getPayDetail.id);
        let isPartialCreated = await partialPaymentDetail.create({
            payment_id: getPayDetail.id,
            amount: order.order_amount,
            payment_date: reqbody.data.payment.payment_time
        });
        res.status(200).json(reqbody)
        console.log('if work');
    }
    else if (reqbody && order.order_tags == null) {
        console.log('else if work');
        res.status(200).json(reqbody)
        // next(apiError.InternalServerError("Can't Find anything on server"));
    }
    else {
        console.log('else work');
        next(apiError.InternalServerError("Can't Find anything on server"));
    }
}
const paymentLinkDetail = async (req, res, next) => {
    let id = req.params.id;
    try{

        let paymentDetailedObj = await payDetails.findOne({include: [
            {
              model: partialPaymentDetail,
            }],
            where:{id:id}}
            );;
        if (paymentDetailedObj instanceof payDetails) {
            res.status(200).send({ message: "Succesfully find data", data: paymentDetailedObj, success: true });
        }
    }
    catch(e){
        console.log(e);
    next(apiError.BadRequest("Can't find data",e))
}
}
const updatePaymentbyID = async (req, res, next) => {
    let reqdata = req.body;
    console.log(reqdata);
    let id = req.params.id;
    let updateObj = {
        link_status: reqdata.link_status,
        link_amount_paid: reqdata.link_amount_paid
    }
    try {
        let isStatusnAmoutUpdate = await payDetails.update(updateObj, { where: { link_id: id } })
        if (isStatusnAmoutUpdate) {
            res.status(200).send({ message: "Successfull Update Status", status: "Success", success: true });
        }
    } catch (err) {
        next(apiError.BadRequest("can't update payment detail table with id", err))
    }



}

module.exports = {
    updateAmountnStatusbyID, updatePaymentnOrderDetail, updatePaymentbyID, cashfreeWebhook, paymentLinkDetail
}