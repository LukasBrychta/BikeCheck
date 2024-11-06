const express = require('express');
const router = express.Router();
const activities_controller = require('../controllers/activities_controller');

router.get('/components/:component_id/activities', activities_controller.getComponentActivities);
router.post('/components/:component_id/activities', activities_controller.createComponentActivity);
router.get('/components/:component_id/activities/:activity_id', activities_controller.getActivityById);
router.put('/components/:component_id/activities/:activity_id', activities_controller.updateActivity);
router.delete('/components/:component_id/activities/:activity_id', activities_controller.deleteActivity);

module.exports = activities_controller;