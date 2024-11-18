const {Component} = require('../models');

exports.getBikesComponents = async (req, res) => {
    try {
        const { bike_id } = req.params;
        const data = await Component.findAll({
            where: { bike_id: bike_id }
        });

        if (data) {
            res.send({
                data,
                message: `Components for bike with bike_id=${bike_id} retrieved successfully.`
            });
        } else {
            res.status(404).send({
                message: `No components found for bike with bike_id=${bike_id}.`
            });
        }
    } catch (err) {
        res.status(500).send({
            message:
                err.message || `Error retrieving components for bike with bike_id=${bike_id}.`
        });
    }
};

exports.createBikesComponent = async (req, res) => {
    try {
        const { bike_id } = req.params;
        const { name, type, usage, lifespan } = req.body;

        if (!name || !type || !usage || !lifespan) {
            return res.status(400).send({
                message: "All fields (name, type, usage, lifespan) are required."
            });
        }

        const component = {
            name,
            type,
            usage,
            lifespan,
            bike_id, // Assuming the component belongs to a bike
        };

        const data = await Component.create(component);
        res.send({
            data,
            message: `Component for bike with bike_id=${bike_id} created.`
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || `Error occurred while creating component.`
        });
    }
};

exports.getBikesComponent = async (req, res) => {
    try {
        const { bike_id, component_id } = req.params;
        const data = await Component.findOne({
            where: { bike_id: bike_id, component_id: component_id }
        });

        if (data) {
            res.send({
                data,
                message: `Component with component_id=${component_id} for bike with bike_id=${bike_id} retrieved successfully.`
            });
        } else {
            res.status(404).send({
                message: `No component found with component_id=${component_id} for bike with bike_id=${bike_id}.`
            });
        }
    } catch (err) {
        res.status(500).send({
            message:
                err.message || `Error retrieving component with component_id=${component_id} for bike with bike_id=${bike_id}.`
        });
    }
};

exports.updateBikesComponent = async (req, res) => {
    try {
        const { bike_id, component_id } = req.params;
        const [updated] = await Component.update(req.body, {
            where: { bike_id: bike_id, component_id: component_id }
        });

        if (updated) {
            res.send({
                message: `Component with component_id=${component_id} for bike with bike_id=${bike_id} was updated.`
            });
        } else {
            res.status(404).send({
                message: `Cannot update component with component_id=${component_id} for bike with bike_id=${bike_id}.`
            });
        }
    } catch (err) {
        res.status(500).send({
            message:
                err.message || `Error updating component with component_id=${component_id} for bike with bike_id=${bike_id}.`
        });
    }
};

exports.deleteBikesComponent = async (req, res) => {
    try {
        const { bike_id, component_id } = req.params;
        const deleted = await Component.destroy({
            where: { bike_id: bike_id, component_id: component_id }
        });

        if (deleted) {
            res.send({
                message: `Component with component_id=${component_id} for bike with bike_id=${bike_id} was deleted.`
            });
        } else {
            res.status(404).send({
                message: `Cannot delete component with component_id=${component_id} for bike with bike_id=${bike_id}.`
            });
        }
    } catch (err) {
        res.status(500).send({
            message:
                err.message || `Error deleting component with component_id=${component_id} for bike with bike_id=${bike_id}.`
        });
    }
};

