const express = require('express');
const users_router = express.Router();
const users_controller = require('../controllers/users_controller');

users_router.post('/users', users_controller.createUser);
users_router.get('/users/:user_id', users_controller.getUserById);
users_router.put('/users/:user_id', users_controller.updateUser);
users_router.delete('/users/:user_id', users_controller.deleteUser);

module.exports = users_router;

