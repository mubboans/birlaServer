const User = require('../model/user_model')

const createUser =async (req,res)=>{
    try {
        console.log('postcalled');
        const { firstname, lastname} = req.body;
        const user = await User.create({ firstname, lastname});
        res.status(201).send({message:"Success create user",user});
      } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Internal server error',error:error });
      }

}
module.exports = {createUser};