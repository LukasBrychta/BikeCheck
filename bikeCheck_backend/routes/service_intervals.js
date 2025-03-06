const express = require('express');
const service_router = express.Router();
const serv_int_controller = require('../controllers/serv_int_controller');

service_router.get('/components/:component_id/service_intervals', serv_int_controller.getComponentServiceIntervals);
service_router.post('/components/:component_id/service_intervals', serv_int_controller.createComponentServiceInterval);
service_router.get('/components/:component_id/service_intervals/:service_id', serv_int_controller.getServiceIntervalById);
service_router.put('/components/:component_id/service_intervals/:service_id', serv_int_controller.updateServiceInterval);
service_router.delete('/components/:component_id/service_intervals/:service_id', serv_int_controller.deleteServiceInterval);

module.exports = service_router;