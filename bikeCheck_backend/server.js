const db = require('./models');
const express = require('express');
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

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

app.get("/")