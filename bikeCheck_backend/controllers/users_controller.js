const {User} = require('../models');

exports.createUser = (req, res) => {
    const { strava_id, username, email } = req.body;

    if (!strava_id || !username || !email) {
        return res.status(400).send({
            message: "All fields (strava_id, username, email) are required."
        });
    }

    const user = {
        strava_id,
        username,
        email,
    };

    User.create(user)
    .then(data => {
        res.send({
            data,
            message: "User created."
        });
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Error occurred while creating user."
        });
    });
};

exports.getUserById = (req, res) => {
    const { user_id } = req.params;

    User.findByPk(user_id)
    .then(data => {
        if(data) {
            res.send({
                data,
                message: `User with id=${user_id} found.`
            });
        }
        else{
            res.status(404).send({
                message: 
                    err.message || `Cannot find User with id=${user_id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err.message || `Error retrieving user with id=${user_id}.`
        });
    });
};

exports.updateUser = (req, res) => {
    const user_id = req.params.user_id;

    User.update(req.body, {
        where: {user_id: user_id}
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: `User with id=${user_id} was updated.`
            });
        }
        else{
            res.status(404).send({
                message: 
                    err.message || `Cannot update User with id=${user_id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err.message || `Error updating user with id=${user_id}.`
        });
    });
};

exports.deleteUser = (req, res) => {
    const user_id = req.params.user_id;

    User.destroy({
        where: {user_id: user_id}
    })
    .then(num => {
        if(num == 1) {
            res.send({
                message: `User with id=${user_id} was deleted.`
            });
        }
        else{
            res.status(404).send({
                message: 
                    err.message || `Cannot delete User with id=${user_id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err.message || `Error deleting user with id=${user_id}.`
        });
    });
};