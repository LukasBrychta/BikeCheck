const express = require('express');
const bikes_router = express.Router();
const bikes_controller = require('../controllers/bikes_controller');

bikes_router.get('/users/:user_id/bikes', bikes_controller.getBikes);
bikes_router.post('/users/:user_id/bikes', bikes_controller.createBike);
bikes_router.get('/users/:user_id/bikes/:bike_id', bikes_controller.getBikeById);
bikes_router.put('/users/:user_id/bikes/:bike_id', bikes_controller.updateBike);
bikes_router.delete('/users/:user_id/bikes/:bike_id', bikes_controller.deleteBike);

module.exports = bikes_router;