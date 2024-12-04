const express = require('express');
const router = express.Router();
const components_controller = require('../controllers/components_controller');

router.get('/bikes/:bike_id/components', components_controller.getBikesComponents);
router.post('/bikes/:bike_id/components', components_controller.createBikesComponent);
router.get('/bikes/:bike_id/components/:component_id', components_controller.getBikesComponent);
router.post('/bikes/:bike_id/components/:component_id', components_controller.updateComponent);
router.delete('/bikes/:bike_id/components/:component_id', components_controller.deleteComponent);

router.get('/users/:user_id/components', components_controller.getStoredComponents);
router.post('/users/:user_id/components', components_controller.createStoredComponent);
router.get('/users/:user_id/components/:component_id', components_controller.getStoredComponent);
router.put('/users/:user_id/components/:component_id', components_controller.updateComponent);
router.delete('/users/:user_id/components/:component_id', components_controller.deleteComponent);

module.exports = components_controller;