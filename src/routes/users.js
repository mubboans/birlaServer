const express = require('express');
const router = express.Router()
const { getAllUsers, createUser, updateUser, getUserById, deleteUser } = require('../controller/userController')

router.get('/allUser', getAllUsers);
router.get('/getUserById/:id', getUserById)
router.post('/createUser', createUser)
router.put('/updateUser::id', updateUser)
router.delete('/deleteUser::id', deleteUser)

module.exports = router