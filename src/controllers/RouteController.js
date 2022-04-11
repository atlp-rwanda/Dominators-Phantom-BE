import responseHandler from '../utils/responseHandler';
<<<<<<< HEAD
import model from '../database/models';
import { getPagination, getPagingData } from '../utils/paginationHandler';
import { draw } from '../helpers/drawCoordinates';
=======
import model from '../database/models'

import { getPagination } from '../utils/paginationHandler';
import { getPagingData } from '../utils/paginationHandler';


>>>>>>> 3ede931 (crud route tests)
const busRoutes = model.routes;

const addRoute = async (req, res) => {

<<<<<<< HEAD
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
=======
    if (!req.body.origin || !req.body.destination || !req.body.distance || !req.body.code) {

        responseHandler(res, 400, req.t('missing_params'));

        return;
    }

    await busRoutes.findOrCreate({
        where: { origin: req.body.origin, destination: req.body.destination, code: req.body.code, distance: req.body.distance },
        default: { distance: req.body.distance }
    }).then(([route, created]) => {
        if (created) responseHandler(res, 200, req.t('created_ok'))
        else responseHandler(res, 400, req.t('already_exist'))
>>>>>>> 3ede931 (crud route tests)
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

<<<<<<< HEAD
const fetchOne = async (req, res) => {
    const id = req.params.id;

    await busRoutes.findOne({
=======
const findOne = async (req, res) => {
    const id = req.params.id;

    await busRoutes.findAll({
>>>>>>> 3ede931 (crud route tests)
        where: {
            routeSlug: id
        }
    }).then(data => {
<<<<<<< HEAD
        null != data ? res.send(data) : responseHandler(res, 404, req.t("not_found"));
=======
        if (data != "") {
            res.send(data);
        } else {
            responseHandler(res, 404, req.t('not_found'));
        }
>>>>>>> 3ede931 (crud route tests)
    })
}

const updateRoute = async (req, res) => {
    const id = req.params.id;
<<<<<<< HEAD
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
=======
    await busRoutes.update(req.body, {
        where: {
            routeSlug: id
        },
        individualHooks: true
    }).then(num => {
        if (num[1].length > 0) {
            responseHandler(res, 200, req.t('updated_ok'));
        } else {
            responseHandler(res, 400, req.t('updated_invalid_req'))
        }
>>>>>>> 3ede931 (crud route tests)
    });
}

const removeRoute = async (req, res) => {
    const id = req.params.id;

    await busRoutes.destroy({
        where: { routeSlug: id }
    }).then(num => {
<<<<<<< HEAD
        1 == num ? responseHandler(res, 200, req.t("deleted_ok")) : responseHandler(res, 400, req.t("delete_invalid_req"));
=======
        if (num == 1) {
            responseHandler(res, 200, req.t('deleted_ok'));
        } else {
            responseHandler(res, 400, req.t('delete_invalid_req'));
        }
>>>>>>> 3ede931 (crud route tests)
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

<<<<<<< HEAD
export { addRoute, findAll, fetchOne as findOne, updateRoute, removeRoute, deleteAll }
=======








export { addRoute, findAll, findOne, updateRoute, removeRoute, deleteAll }
>>>>>>> 3ede931 (crud route tests)
