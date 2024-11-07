exports.createUser = (req, res) => {
    if(!req.body.strava_id) {
        res.status(400).send({
            message: "Content can not be empty"
        });
        return;
    }
    const user = {
        strava_id: req.body.strava_id,
        username: req.body.username,
        email: req.body.email,
    };

    User.create(user)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating user."
        });
    });
};

exports.getUserById = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
    .then(data => {
        if(data) {
            res.send(data);
        }
        else{
            res.status(404).send({
                message: `Cannot find User with id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: `Error retrieving user with id=${id}.`
        });
    });
};