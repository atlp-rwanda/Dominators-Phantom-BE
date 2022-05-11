import responseHandler from '../utils/responseHandler';
import model from '../database/models';
import { getPagination, getPagingData } from '../utils/paginationHandler';
import { draw } from '../helpers/drawCoordinates';
import { getPagination } from '../utils/paginationHandler';
import { getPagingData } from '../utils/paginationHandler';

const busRoutes = model.routes;
const addRoute = async (req, res) => {
    console.log(req.body)

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


const updateRoute = async (req, res) => {
    const id = req.params.id;

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
    await busRoutes.update(req.body, {
        where: {
            routeSlug: id,
        }
    });
}

}
const removeRoute = async(req, res) => {
    const id = req.params.id;

    await busRoutes.destroy({
        where: { routeSlug: id }

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
