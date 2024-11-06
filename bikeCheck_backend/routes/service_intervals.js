const express = require('express');
const router = express.Router();
const serv_int_controller = require('../controllers/serv_int_controller');

router.get('/components/:component_id/service_intervals', service_intervals_controller.getComponentServiceIntervals);
router.post('/components/:component_id/service_intervals', service_intervals_controller.createComponentServiceInterval);
router.get('/components/:component_id/service_intervals/:interval_id', service_intervals_controller.getServiceIntervalById);
router.put('/components/:component_id/service_intervals/:interval_id', service_intervals_controller.updateServiceInterval);
router.delete('/components/:component_id/service_intervals/:interval_id', service_intervals_controller.deleteServiceInterval);

module.exports = serv_int_controller;