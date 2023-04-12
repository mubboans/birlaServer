const express = require('express');
const router = express.Router()
const { getAllUsers, createUser, updateUser, getUserById, deleteUser } = require('../controller/userController')

router.get('/', getAllUsers);
router.get('/getUserById/:id', getUserById)
router.post('/createUser', createUser)
router.post('/updateUser', updateUser)
router.delete('/deleteUser/:id', deleteUser)

module.exports = router