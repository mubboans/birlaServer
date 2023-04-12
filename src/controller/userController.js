const { User } = require('../migration/models');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll(); // use Sequelize to find all users
        res.json(users); // send the users
      } 
      catch(e) {console.log(e);}

}

const createUser = async (req, res) => {
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

        res.json(user);
    } catch (e) {
        console.log(e);
    }
}

const updateUser = async (req, res) => {
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
               id: req.body.id 
            }
        })

        res.json(user);
    } catch (e) {
        console.log(e);
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

const deleteUser = async (req, res) => {

    const user = await User.destroy({
        where: {
            id: req.params.id
        }
    })

    res.json(user);
}

module.exports = { getAllUsers, createUser, updateUser, getUserById, deleteUser }