const express = require('express');
const components_router = express.Router();
const components_controller = require('../controllers/components_controller');

components_router.get('/bikes/:bike_id/components', components_controller.getBikesComponents);
components_router.post('/bikes/:bike_id/components', components_controller.createBikesComponent);
components_router.get('/bikes/:bike_id/components/:component_id', components_controller.getBikesComponent);
components_router.put('/bikes/:bike_id/components/:component_id', components_controller.updateComponent);
components_router.delete('/bikes/:bike_id/components/:component_id', components_controller.deleteComponent);

components_router.get('/users/:user_id/components', components_controller.getStoredComponents);
components_router.post('/users/:user_id/components', components_controller.createStoredComponent);
components_router.get('/users/:user_id/components/:component_id', components_controller.getStoredComponent);
components_router.put('/users/:user_id/components/:component_id', components_controller.updateComponent);
components_router.delete('/users/:user_id/components/:component_id', components_controller.deleteComponent);

module.exports = components_router;