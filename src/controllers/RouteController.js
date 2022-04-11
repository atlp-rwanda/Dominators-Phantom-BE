import responseHandler from '../utils/responseHandler';
import model from '../database/models'

import { getPagination } from '../utils/paginationHandler';
import { getPagingData } from '../utils/paginationHandler';


const busRoutes = model.routes;

const addRoute = async (req, res) => {

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

const findOne = async (req, res) => {
    const id = req.params.id;

    await busRoutes.findAll({
        where: {
            routeSlug: id
        }
    }).then(data => {
        if (data != "") {
            res.send(data);
        } else {
            responseHandler(res, 404, req.t('not_found'));
        }
    })
}

const updateRoute = async (req, res) => {
    const id = req.params.id;
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
    });
}

const removeRoute = async (req, res) => {
    const id = req.params.id;

    await busRoutes.destroy({
        where: { routeSlug: id }
    }).then(num => {
        if (num == 1) {
            responseHandler(res, 200, req.t('deleted_ok'));
        } else {
            responseHandler(res, 400, req.t('delete_invalid_req'));
        }
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









export { addRoute, findAll, findOne, updateRoute, removeRoute, deleteAll }