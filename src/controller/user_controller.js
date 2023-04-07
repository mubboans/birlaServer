const User = require('../model/user_model')

const createUser =async (req,res)=>{
    try {
        console.log('postcalled');
        const { firstname, lastname} = req.body;
        const user = await User.create({ firstname, lastname});
        res.status(201).send({message:"Success create user",success:true,status:'Success'});
      } catch (error) {
        // console.error(error);
        res.status(400).json({ message: "Can't Post Data",error:error,success:false,status:'Failed' });
      }

}
const getAllUser=async(req,res)=>{
  try{
    console.log('getcalled');
    const data = await User.findAll();
    console.log(JSON.stringify(data));
    if(data) {
      log
      res.status(200).send({message:"Success get user",data:user,success:true,status:'Success'});
    }
  }
  catch(err){
    res.status(404).json({ message: "Can't Get Data",error:err,success:false,status:'Failed'});
  }
}

module.exports = {createUser,getAllUser};