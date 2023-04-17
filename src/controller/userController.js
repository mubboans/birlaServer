const apiError = require('../error/apiError');
const { User } = require('../migration/models');

const getAllUsers = async (req, res,next) => {
    try {
        console.log('get called');
        const users = await User.findAll({order: [['createdAt', 'DESC']]});

            console.log(users);
        if(users){
            res.status(200).send({message:"Customer created succesfully",success:true,status:"Success",data:users})
        }

      } 
      catch(e) {
        next(apiError.NotFound("Can't found anything on server",e))
      }

}

const createUser = async (req, res,next) => {
    try {
        const user = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            contact: req.body.contact,
            addressLine1: req.body.addressLine1,
            addressLine2: req.body.addressLine2,
            pincode: req.body.pincode,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
        })
        if(user){
            res.status(200).send({message:"Customer created succesfully",success:true,status:"Success"})
        }
        // console.log(user);
    } catch (e) {
        next(apiError.BadRequest("Can't create customer",e))
    }
}

const updateUser = async (req, res,next) => {
    let id = req.params.id;
    console.log(id,'update');
    try {
        const user = await User.update({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            contact: req.body.contact,
            addressLine1: req.body.addressLine1,
            addressLine2: req.body.addressLine2,
            pincode: req.body.pincode,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
        }, {
            where: {
               id: id 
            }
        })
        if(user){
            res.status(200).send({message:"Customer updated succesfully",success:true,status:"Success"})
        }
        
    } catch (e) {

        next(apiError.BadRequest("Can't update customer",e))
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await User.findAll({
            where: {
                id : req.params.id
            }
        })

        res.json(user);
    } catch (e) {
        console.log(e);
    }
}

const deleteUser = async (req, res,next) => {
    let id = req.params.id
    const isUserdeleted = await User.destroy({
        where: {
            id: id
        }
    })
console.log(isUserdeleted);
    if(isUserdeleted == 1){
        res.status(200).send({message:"Customer deleted succesfully",success:true,status:"Success"})
    }
    else{
        next(apiError.BadRequest("Can't delete customer"))
    }
}

module.exports = { getAllUsers, createUser, updateUser, getUserById, deleteUser}