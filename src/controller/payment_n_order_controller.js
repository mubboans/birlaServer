const apiError = require('../error/apiError');
const { orderDetail, payDetails } = require('../migration/models');
const updateAmountnStatusbyID = async (req, res, next) => {
    let orderid = req.params.id;
    let updatedData = req.body;
    console.log('update called',updatedData);
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
module.exports = {
    updateAmountnStatusbyID
}