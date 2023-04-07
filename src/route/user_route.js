const express = require('express');
const { createUser, getAllUser } = require('../controller/user_controller');
const route = express.Router();

route.post('/user/create',createUser);

route.get('/user/data/all' , getAllUser);

module.exports = route