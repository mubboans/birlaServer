const { where } = require('sequelize');
const apiError = require('../error/apiError');
const asyncHandler = require('../middleware/asyn-await-wrapper');
// const data = require('../migration/migrations/20230410063224-create-invoice-item')
const invoiceItem = require('../migration/models/index')['itemDetail']
const deleteInvoiceItem =async (req,res,next)=>{
    console.log('delete');
    let id = req.params.ids;
        console.log(id);
    const result = await invoiceItem.destroy({
        where: {
          id: id
        }
      })
      console.log(result);
      if(result == 1){
        res.status(200).send({message:"Succesfully Deleted invoice item",success:true,status:"Success"})
    }
    else
    {
        next(apiError.BadRequest("Can't Delete item"))
    }

}
const getAllItem =async (req,res,next)=>{
    try{
        console.log('get item called');
        let Item = await invoiceItem.findAll()
        if(Item){
            res.status(200).send({message:'data found',Item})
        }
        }
    catch(err){
        console.log(err,'error');
        next(apiError.BadRequest("Can't found item",err))
    }
}

const updateItembyId =asyncHandler(async(req,res,next)=>{
    let id = encodeURIComponent(req.params.ids)
    let data = req.body
    let updateBody = {
        itemname:data.itemname,
        itemprice: data.price,
        status:data.status,
        category:data.category
    }
    console.log(decodeURIComponent(id));
    let update =await invoiceItem.update(updateBody,{where:{id:id}})
    console.log(update,'update')
    if(update[0] == 1){
        res.status(200).send({message:"Succesfully Update invoice item",success:true,status:"Success"})
    }
    else
    {
        next(apiError.BadRequest("Can't update missing parameter"))
    }
}
)



const createInvoiceItem =asyncHandler(async (req,res,next)=>{
    let data = req.body;
    console.log(data);
    let item = await invoiceItem.create({itemname:data.itemname,itemprice:data.price,status:data.status,category:data.category})
    if(item){
        console.log(item.dataValues,'Item');
        res.status(201).send({message:"Succesfully created invoice item",success:true,status:"Success"})
    }
else{
    next(apiError.BadRequest("Error in creating invoice Item"))
}
}
)


module.exports={getAllItem,createInvoiceItem,updateItembyId,deleteInvoiceItem}