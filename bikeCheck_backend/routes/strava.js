const express = require('express');
const strava_router = express.Router();
const strava_controller = require('../controllers/strava_controller');

strava_router.post('/auth/tokenexchange', strava_controller.tokenExchange)

module.exports = strava_router;