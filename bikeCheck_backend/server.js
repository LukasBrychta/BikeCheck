const db = require('./models');

db.sequelize.authenticate()
    .then(() => {
        console.log('Connection to the database has been extabilished.');
    })
    .catch(err => {
        console.error('Unable to connect to the database: ', err);
    });

db.sequelize.sync({ alter: true})
    .then(() => {
        console.log('Database and tables created.');
    })
    .catch(err => {
        console.error('Error syncing database: ', err);
    });