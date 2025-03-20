const { Service_Interval, Component } = require('../models');

exports.getComponentServiceIntervals = async (req, res) => {
    try {
        const { component_id } = req.params;
        const data = await Component.findByPk(component_id, {
            include: { 
                model: Service_Interval,
                through: { attributes: [] }
            }
        });

        if (data) {
            res.send({
                services: data.Service_Intervals,
                message: `Services for component with component_id=${component_id} retrieved successfully.`
            });
        } else {
            res.status(404).send({
                message: `No services found for compoent with component_id=${component_id}.`
            });
        }
    } catch (err) {
        res.status(500).send({ message: err.message || 'Error fetching service intervals for component.' });
    }
};

exports.createComponentServiceInterval = async (req, res) => {
    try {
        const { component_id } = req.params;
        const { description } = req.body;

        const component = await Component.findOne({where: {component_id: component_id}});
        if (!component) {
            return res.status(404).send({ message: `Component with component_id=${component_id} not found.` });
        }

        const serviceInterval = await Service_Interval.create({ description });
        await component.addService_Interval(serviceInterval);

        res.send({ serviceInterval, message: 'Service interval created successfully.' });
    } catch (err) {
        res.status(500).send({ message: err.message || 'Error creating service interval.' });
    }
};

exports.getServiceIntervalById = async (req, res) => {
    try {
        const { component_id, service_id } = req.params;
        const serviceInterval = await Service_Interval.findOne({
            where: { service_id: service_id }
        });

        if (!serviceInterval) {
            return res.status(404).send({ message: `Service interval with service_id=${service_id} for component_id=${component_id} not found.` });
        }

        res.send(serviceInterval);
    } catch (err) {
        res.status(500).send({ message: err.message || 'Error fetching service interval.' });
    }
};

exports.updateServiceInterval = async (req, res) => {
    try {
        const { component_id, service_id } = req.params;
        const [updated] = await Service_Interval.update(req.body, {
            where: { service_id: service_id }
        });

        if (updated) {
            res.send({ message: `Service interval with service_id=${service_id} for component_id=${component_id} updated successfully.` });
        } else {
            res.status(404).send({ message: `Cannot update service interval with service_id=${service_id} for component_id=${component_id}.` });
        }
    } catch (err) {
        res.status(500).send({ message: err.message || 'Error updating service interval.' });
    }
};

exports.deleteServiceInterval = async (req, res) => {
    try {
        const { component_id, service_id } = req.params;
        const deleted = await Service_Interval.destroy({
            where: { service_id: service_id }
        });

        if (deleted) {
            res.send({ message: `Service interval with service_id=${service_id} for component_id=${component_id} deleted successfully.` });
        } else {
            res.status(404).send({ message: `Cannot delete service interval with service_id=${service_id} for component_id=${component_id}.` });
        }
    } catch (err) {
        res.status(500).send({ message: err.message || 'Error deleting service interval.' });
    }
};