const { Activity, Component } = require('../models');

exports.getComponentActivities = async (req, res) => {
    try {
        const { component_id } = req.params;
        const component = await Component.findByPk(component_id, {
            include: { model: Activity }
        });

        if (!component) {
            return res.status(404).send({ message: `Component with component_id=${component_id} not found.` });
        }

        res.send(component.Activities);
    } catch (err) {
        res.status(500).send({ message: err.message || 'Error fetching activities for component.' });
    }
};

exports.createComponentActivity = async (req, res) => {
    try {
        const { component_id } = req.params;
        const { distance, duration, bike_id } = req.body;

        if (!distance || !duration || !bike_id) {
            return res.status(400).send({ message: 'Distance, duration and bike_id are required.' });
        }

        const component = await Component.findByPk(component_id);
        if (!component) {
            return res.status(404).send({ message: `Component with component_id=${component_id} not found.` });
        }

        const activity = await Activity.create({ 
            distance, 
            duration, 
            bike_id, 
            component_id 
        });
        
        res.send({ activity, message: 'Activity created successfully.' });
    } catch (err) {
        res.status(500).send({ message: err.message || 'Error creating activity.' });
    }
};

exports.getActivityById = async (req, res) => {
    try {
        const { component_id, activity_id } = req.params;
        const activity = await Activity.findOne({
            where: { activity_id, component_id }
        });

        if (!activity) {
            return res.status(404).send({ message: `Activity with activity_id=${activity_id} for component_id=${component_id} not found.` });
        }

        res.send(activity);
    } catch (err) {
        res.status(500).send({ message: err.message || 'Error fetching activity.' });
    }
};

exports.updateActivity = async (req, res) => {
    try {
        const { component_id, activity_id } = req.params;
        const [updated] = await Activity.update(req.body, {
            where: { activity_id: activity_id }
        });

        if (updated) {
            res.send({ message: `Activity with activity_id=${activity_id} for component_id=${component_id} updated successfully.` });
        } else {
            res.status(404).send({ message: `Cannot update activity with activity_id=${activity_id} for component_id=${component_id}.` });
        }
    } catch (err) {
        res.status(500).send({ message: err.message || 'Error updating activity.' });
    }
};

exports.deleteActivity = async (req, res) => {
    try {
        const { component_id, activity_id } = req.params;
        const deleted = await Activity.destroy({
            where: { activity_id: activity_id }
        });

        if (deleted) {
            res.send({ message: `Activity with activity_id=${activity_id} for component_id=${component_id} deleted successfully.` });
        } else {
            res.status(404).send({ message: `Cannot delete activity with activity_id=${activity_id} for component_id=${component_id}.` });
        }
    } catch (err) {
        res.status(500).send({ message: err.message || 'Error deleting activity.' });
    }
};