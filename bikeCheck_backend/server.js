const db = require('./models');
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const usersRoutes = require('./routes/users');
const bikesRoutes = require('./routes/bikes');
const componentsRoutes = require('./routes/components');
const activitiesRoutes = require('./routes/activities');
const serviceRoutes = require('./routes/service_intervals');
const stravaRoutes = require('./routes/strava');

app.use('/users', usersRoutes);
app.use('/bikes', bikesRoutes);
app.use('/components', componentsRoutes);
app.use('/activities', activitiesRoutes);
app.use('/service', serviceRoutes);
app.use('/strava', stravaRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

db.sequelize.authenticate()
    .then(() => {
        console.log('Connection to the database has been estabilished.');
    })
    .catch(err => {
        console.error('Unable to connect to the database: ', err);
    });

db.sequelize.sync()
    .then(() => {
        console.log('Database and tables created.');
    })
    .catch(err => {
        console.error('Error syncing database: ', err);
    });

app.listen(port, () => {
});

module.exports = app;