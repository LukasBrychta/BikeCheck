const express = require('express');
const router = express.Router();
const users_controller = require('../controllers/users_controller');

router.post('/users', users_controller.createUser);
router.get('/users/:user_id', users_controller.getUserById);
router.put('/users/:user_id', users_controller.updateUser);
router.delete('/users/:user_id', users_controller.deleteUser);

module.exports = users_router;

