const express = require('express');
const router = express.Router();
const bikes_controller = require('../controllers/bikes_controller');

router.get('/users/:user_id/bikes', bikes_controller.getBikes);
router.post('/users/:user_id/bikes', bikes_controller.createBike);
router.get('/users/:user_id/bikes/:bike_id', bikes_controller.getBikeById);
router.put('/users/:user_id/bikes/:bike_id', bikes_controller.updateBike);
router.delete('/users/:user_id/bikes/:bike_id', bikes_controller.deleteBike);

module.exports = bikes_controller;