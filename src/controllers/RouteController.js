import responseHandler from '../utils/responseHandler';
import model from '../database/models'

import { getPagination } from '../utils/paginationHandler';
import { getPagingData } from '../utils/paginationHandler';


const busRoutes = model.Route;

const addRoute = async (req, res) => {

    if (!req.body.origin || !req.body.destination || !req.body.distance || !req.body.code) {

        responseHandler(res, 400, req.t('missing_params'));

        return;
    }

    await busRoutes.findOrCreate({
        where: { origin: req.body.origin, destination: req.body.destination, code: req.body.code, distance: req.body.distance }
    }).then(([route, created]) => {
        if (created) responseHandler(res, 200, req.t('created_ok'))
        else responseHandler(res, 400, req.t('already_exist'))

    })
        .catch(err => {
            responseHandler(res, 500, req.t('create_fail'));
        });
}

const findAll = async (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    await busRoutes.findAndCountAll({ 
        limit, offset,  
     })
        .then(data => {
            const response = getPagingData(data, page, limit);
            res.send(response);
        })
        .catch(err => {
            responseHandler(res, 500, req.t(err));
            console.log(err)
        });
}

const findOne = async (req, res) => {
    const id = req.params.id;

    await busRoutes.findAll({
        where: { routeId: id }
    })
        .then(data => {
            if (data != "") {
                res.send(data);
            } else {
                responseHandler(res, 404, req.t('not_found'));

            }
        })
        .catch(err => {
            responseHandler(res, 500, req.t('cannot_find'));

        });
}

const updateRoute = async (req, res) => {
    const id = req.params.id;
    await busRoutes.update(req.body, {
        where: { routeId: id }
    })
        .then(num => {
            if (num == 1) {
                responseHandler(res, 200, req.t('updated_ok'));
            } else {
                responseHandler(res, 400, req.t('updated_invalid_req'))
            }
        })
        .catch(err => {
            responseHandler(res, 500, req.t('updated_fail'))

        });
}

const removeRoute = async (req, res) => {
    const id = req.params.id;

    await busRoutes.destroy({
        where: { routeId: id }
    })
        .then(num => {
            if (num == 1) {
                responseHandler(res, 200, req.t('deleted_ok'));
            } else {
                responseHandler(res, 400, req.t('delete_invalid_req'));
            }
        })
        .catch(err => {
            responseHandler(res, 500, req.t('deleted_fail'));
        });
};

const deleteAll = async (req, res) => {
    await busRoutes.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            responseHandler(res, 200, req.t('many_deleted'));
        })
        .catch(err => {
            responseHandler(res, 500, req.t('deleted_fail'));
        });
}

export { addRoute, findAll, findOne, updateRoute, removeRoute, deleteAll }