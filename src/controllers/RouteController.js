import responseHandler from '../utils/responseHandler';
<<<<<<< HEAD
import model from '../database/models'
import Op from 'sequelize';
const busRoutes = model.routes;

const addRoute = async (req, res) => {
    // Validate request
    if (!req.body.origin || !req.body.destination || !req.body.distance || !req.body.code) {
        res.status(400).send({
            message: "Invalid request! Missing required items!"
        });
        return;
    }

    // // Create a ROUTE

    await busRoutes.findOrCreate({
        where: { origin: req.body.origin, destination: req.body.destination, code: req.body.code, distance: req.body.distance }
    }).then(([route, created]) => {
        if (created) responseHandler(res, 200, route)
        else responseHandler(res, 400, "Route already exists.")

    })
        .catch(err => {
            responseHandler(res, 500, err.message || "Some error occurred while creating the route.")
        });
}

const findAll = async (req, res) => {

    await busRoutes.findAll({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving routes."
            });
        });
}


const findOne = async (req, res) => {
    const id = req.params.id;

    await busRoutes.findAll({
        where: { routeSlug: id }
    })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Route with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Route with id=" + id
            });
        });
=======
import model from '../database/models';
import { getPagination, getPagingData } from '../utils/paginationHandler';
import { draw } from '../helpers/drawCoordinates';
const busRoutes = model.routes;

const addRoute = async (req, res) => {

    if (!(req.body.origin && req.body.destination && req.body.distance && req.body.code && req.body.latitude && req.body.longitude))
        return responseHandler(res, 400, req.t("missing_params"))

    const point = draw(req.body.latitude, req.body.longitude);

    await busRoutes.findOrCreate({
        where: {
            origin: req.body.origin,
            destination: req.body.destination,
            code: req.body.code,
            distance: req.body.distance
        },
        defaults: { coordinates: point }
    }).then((created) => {
        created[1] ? responseHandler(res, 200, req.t("created_ok")) : responseHandler(res, 401, req.t("already_exist"));
    });
}

const findAll = async (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    await busRoutes.findAndCountAll({ limit, offset })
        .then(data => {
            const response = getPagingData(data, page, limit);
            res.send(response);
        });
}

const fetchOne = async (req, res) => {
    const id = req.params.id;

    await busRoutes.findOne({
        where: {
            routeSlug: id
        }
    }).then(data => {
        null != data ? res.send(data) : responseHandler(res, 404, req.t("not_found"));
    })
>>>>>>> develop
}

const updateRoute = async (req, res) => {
    const id = req.params.id;
<<<<<<< HEAD

    // if (req.body.origin != undefined || req.body.destination != undefined) {
    //     const foundItem = await busRoutes.findAll({
    //         where: {
    //             [Op.or]: [
    //                 { origin: req.body.origin },
    //                 { destination: req.body.destination }
    //             ]
    //         }
    //     });
    //     if (foundItem) {
    //         return responseHandler(res, 400, "Conflicts occured with existing route.")
    //     }
    // }


    await busRoutes.update(req.body, {
        where: { routeSlug: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Route was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Route with id=${id}. Maybe Route was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Route with id=" + id,
                developer_message:err
            });
        });
}

const removeRoute = async(req, res) => {
=======
    let latitude = req.body.latitude;
    let longitude = req.body.longitude;
    await busRoutes.findOne({ where: { routeSlug: id } })
        .then(data => {
            if (data != null) {
                req.body.latitude == undefined ? (latitude = data.coordinates[0]) : (req.body.latitude)
                req.body.longitude == undefined ? (longitude = data.coordinates[1]) : (req.body.longitude)
            } else {
                responseHandler(res, 400, req.t('updated_invalid_req'));
            }

        })
    const passMap = () => req.body.latitude || req.body.longitude ? { coordinates: draw(latitude, longitude) } : req.body;

    await busRoutes.update(passMap(), {
        where: {
            routeSlug: id,
        }
    }).then(num => {
        num[1].length > 0 && responseHandler(res, 200, req.t("updated_ok"));
    });
}

const removeRoute = async (req, res) => {
>>>>>>> develop
    const id = req.params.id;

    await busRoutes.destroy({
        where: { routeSlug: id }
<<<<<<< HEAD
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Route was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Route with id=${id}. Maybe Route was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Route with id=" + id
            });
        });
};

const deleteAll = async(req, res) => {
    await busRoutes.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Routes were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all routes."
            });
        });
}

export { addRoute, findAll, findOne, updateRoute, removeRoute, deleteAll }
=======
    }).then(num => {
        1 == num ? responseHandler(res, 200, req.t("deleted_ok")) : responseHandler(res, 400, req.t("delete_invalid_req"));
    });
}

const deleteAll = async (req, res) => {
    await busRoutes.destroy({
        where: {},
        truncate: false
    }).then(nums => {
        responseHandler(res, 200, req.t('many_deleted'));
    });
}

export { addRoute, findAll, fetchOne as findOne, updateRoute, removeRoute, deleteAll }
>>>>>>> develop
