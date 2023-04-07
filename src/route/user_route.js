const express = require('express');
const { createUser } = require('../controller/user_controller');
const route = express.Router();

route.post('/user/create',createUser)

module.exports = route