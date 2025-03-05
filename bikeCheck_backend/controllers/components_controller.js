const {Component, Bike, User} = require('../models');

exports.getBikesComponents = async (req, res) => {
    try {
        const { bike_id } = req.params;
        const data = await Bike.findByPk(bike_id, {
            include: {
                model: Component,
                through: {
                    attributes: [],
                },
            },
        });

        if (data) {
            res.send({
                components: data.Components,
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

        const bike = await Bike.findOne({where: {bike_id: bike_id}});
        if (!bike) {
            return res.status(404).send({ message: 'Bike not found' });
        }
        
        const component = await Component.create({
            name,
            type,
            usage,
            lifespan
        });
        
        await bike.addComponent(component);
    
        res.send({
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
        const data = await Bike.findByPk(bike_id, {
            include: {
                model: Component,
                through: {attributes: []},
                where: {component_id: component_id}
            },
        });

        if (data) {
            res.send({
                component: data.Components[0],
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

exports.getStoredComponents = async (req, res) => {
    try {
        const { user_id } = req.params;
        const data = await User.findByPk(user_id, {
            include: {
                model: Component,
                through: { attributes: [] },  
            },
        });

        if (data) {
            res.send({
                components: data.Components,
                message: `Components for user with user_id=${user_id} retrieved successfully.`
            });
        } else {
            res.status(404).send({
                message: `No components found for user with user_id=${user_id}.`
            });
        }
    } catch (err) {
        res.status(500).send({
            message:
                err.message || `Error fetching stored components for user_id=${user_id}.`,
        });
    }
};

exports.createStoredComponent = async (req, res) => {
    try {
        const { user_id } = req.params;
        const { name, type, usage, lifespan } = req.body;

        if (!name || !type || !usage || !lifespan) {
            return res.status(400).send({
                message: "All fields (name, type, usage, lifespan) are required."
            });
        }

        const user = await User.findOne({where: {user_id: user_id}});
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        
        const component = await Component.create({
            name,
            type,
            usage,
            lifespan
        });
        
        await user.addComponent(component);
    
        res.send({
            message: `Component for user with user_id=${user_id} created.`
        });
        
    } catch (err) {
        res.status(500).send({
            message: err.message || `Error occurred while creating component.`
        });
    }
};

exports.getStoredComponent = async (req, res) => {
    try {
        const { user_id, component_id } = req.params;
        const data = await User.findByPk(user_id, {
            include: {
                model: Component,
                through: {attributes: []},
                where: {component_id: component_id}
            },
        });

        if (data) {
            res.send({
                component: data.Components[0],
                message: `Component with component_id=${component_id} for user with user_id=${user_id} retrieved successfully.`
            });
        } else {
            res.status(404).send({
                message: `No component found with component_id=${component_id} for user with user_id=${user_id}.`
            });
        }
    } catch (err) {
        res.status(500).send({
            message:
                err.message || `Error retrieving component with component_id=${component_id} for user with user_id=${user_id}.`
        });
    }
};

exports.updateComponent = async (req, res) => {
    try {
        const { component_id } = req.params;
        const [updated] = await Component.update(req.body, {
            where: { component_id: component_id }
        });

        if (updated) {
            res.send({
                message: `Component with component_id=${component_id} was updated.`
            });
        } else {
            res.status(404).send({
                message: `Cannot update component with component_id=${component_id}.`
            });
        }
    } catch (err) {
        res.status(500).send({
            message:
                err.message || `Error updating component with component_id=${component_id}.`
        });
    }
};

exports.deleteComponent = async (req, res) => {
    try {
        const { component_id } = req.params;
        const deleted = await Component.destroy({
            where: { component_id: component_id }
        });

        if (deleted) {
            res.send({
                message: `Component with component_id=${component_id} was deleted.`
            });
        } else {
            res.status(404).send({
                message: `Cannot delete component with component_id=${component_id}.`
            });
        }
    } catch (err) {
        res.status(500).send({
            message:
                err.message || `Error deleting component with component_id=${component_id}.`
        });
    }
};

