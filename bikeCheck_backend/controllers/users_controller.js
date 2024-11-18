const {User} = require('../models');

exports.createUser = async (req, res) => {
    try {
        const { strava_id, username, email } = req.body;
        if (!strava_id || !username || !email) {
            return res.status(400).send({
                message: "All fields (strava_id, username, email) are required."
            });
        };
        const user = {
            strava_id,
            username,
            email,
        };
        const data = await User.create(user);
        res.send({
            data,
            message: "User created."
        });
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Error occurred while creating user."
        });
    };
};

exports.getUserById = async (req, res) => {
    try{
        const { user_id } = req.params;
        const data = await User.findByPk(user_id);

        if(data) {
            res.send({
                data,
                message: `User with id=${user_id} found.`
            });
        } else {
            res.status(404).send({
                message: `Cannot find User with id=${user_id}.`
            });
        };
    } catch (err) {
        res.status(500).send({
            message: 
                err.message || `Error retrieving user with id=${user_id}.`
        });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        const [updated] = await User.update(req.body, {
            where: {user_id: user_id}
        });

        if(updated) {
            res.send({
                message: `User with id=${user_id} was updated.`
            });
        } else {
            res.status(404).send({
                message: `Cannot update User with id=${user_id}.`
            });
        };
    } catch (err) {
        res.status(500).send({
            message: 
                err.message || `Error updating user with id=${user_id}.`
        });
    };
};

exports.deleteUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        const deleted = await User.destroy({
            where: {user_id: user_id}
        });

        if(deleted) {
            res.send({
                message: `User with id=${user_id} was deleted.`
            });
        } else {
            res.status(404).send({
                message: `Cannot delete User with id=${user_id}.`
            });
        };
    } catch (err) {
        res.status(500).send({
            message: 
                err.message || `Error deleting user with id=${user_id}.`
        });
    };
};