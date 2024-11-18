const {Bike} = require('../models');

exports.getBikes = async (req, res) => {
    try{
        const { user_id } = req.params;
        const data = await Bike.findAll({where: {user_id}});

        if(data) {
            res.send({
                data,
                message: `Bikes for user with user_id=${user_id} retrieved successfully.`
            });
        } else {
            res.status(404).send({
                message: `Cannot find bikes for user with user_id=${user_id}.`
            });
        };
    } catch (err) {
        res.status(500).send({
            message:
                err.message || `Error retrieving bikes for user with user_id=${user_id}.`
        });
    };
};

exports.createBike = async (req, res) => {
    try {
        const { user_id } = req.params;
        const { name } = req.body;

        if (!user_id || !name) {
            return res.status(400).send({
                message: "All fields (name, user_id) are required."
            });
        };

        const bike = {
            name,
            user_id,
        };

        const data = await Bike.create(bike);
        res.send({
            data,
            message: `Bike for user with user_id=${user_id} created.`
        });
    } catch (err) {
        res.status(500).send({
            message: 
                err.message || `Error occured while creating bike.`
        });
    };
};

exports.getBikeById = async (req, res) => {
    try {
        const { bike_id, user_id } = req.params;
        const data = await Bike.findOne({
            where: {bike_id: bike_id, user_id: user_id}
        });
        
        if (data) {
            res.send({
                data,
                message: `Bike with id=${bike_id} for user with user_id=${user_id} retrieved successfully.`
            });
        } else {
            res.status(404).send({
                message: `Cannot find bike with bike_id=${bike_id} for user with user_id=${user_id}.`
            });
        };
    } catch (err) {
        res.status(500).send({
            message:
                err.message || `Error retrieving bike with id=${bike_id} for user with user_id=${user_id}.`
        });
    };
};

exports.updateBike = async (req, res) => {
    try {
        const { user_id, bike_id } = req.params;
        const [updated] = await Bike.update(req.body, {
            where: {bike_id: bike_id, user_id: user_id}
        });

        if (updated) {
            res.send({
                message: `Bike with id=${bike_id} for user with user_id=${user_id} was updated.`
            });
        } else {
            res.status(404).send({
                message: `Cannot update bike with id=${bike_id} for user with user_id=${user_id}.`
            });
        }
    } catch (err) {
        res.status(500).send({
            message:
                err.message || `Error updating bike with id=${bike_id} for user with user_id=${user_id}.`
        });
    };
};

exports.deleteBike = async (req, res) => {
    try {
        const { user_id, bike_id } = req.params;
        const deleted = await Bike.destroy({
            where: {bike_id: bike_id, user_id: user_id}
        });

        if (deleted) {
            res.send({
                message: `Bike with id=${bike_id} for user with user_id=${user_id} was deleted.`
            });
        } else {
            res.status(404).send({
                message: `Cannot delete bike with id=${bike_id} for user with user_id=${user_id}.`
            });
        }
    } catch (err) {
        res.status(500).send({
            message:
                err.message || `Error deleting bike with id=${bike_id} for user with user_id=${user_id}.`
        });
    };
};