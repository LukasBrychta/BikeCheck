const express = require('express');
const activities_router = express.Router();
const activities_controller = require('../controllers/activities_controller');

activities_router.get('/components/:component_id/activities', activities_controller.getComponentActivities);
activities_router.post('/components/:component_id/activities', activities_controller.createComponentActivity);
activities_router.get('/components/:component_id/activities/:activity_id', activities_controller.getActivityById);
activities_router.put('/components/:component_id/activities/:activity_id', activities_controller.updateActivity);
activities_router.delete('/components/:component_id/activities/:activity_id', activities_controller.deleteActivity);

module.exports = activities_router;