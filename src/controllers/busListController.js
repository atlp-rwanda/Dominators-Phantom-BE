import responseHandler from '../utils/responseHandler';
import model from '../database/models'

const buses = model.Bus;

const findAll = async (req, res) => {

    await buses.findAll({
        id: req.body.id,
        include: 'routes'
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Buses."
            });
        });
}


const findOne = async (req, res) => {
    const id = req.params.id;

    await buses.findOne({
        where: { id: id },
        include: [{
            model: model.Route, 
            as: 'Route'
        }]
    })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Bus with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Bus with id=" + id
            });
        });
}

export { 
    findAll, 
    findOne
}