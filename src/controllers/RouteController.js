import responseHandler from '../utils/responseHandler';
import model from '../database/models';
import { getPagination, getPagingData } from '../utils/paginationHandler';
import { draw } from '../helpers/drawCoordinates';
const busRoutes = model.routes;

const addRoute = async (req, res) => {
  if (
    !(
      req.body.origin &&
      req.body.destination &&
      req.body.distance &&
      req.body.code &&
      req.body.fromLatitude &&
      req.body.fromLongitude &&
      req.body.toLatitude &&
      req.body.toLongitude
    )
  )
    return responseHandler(res, 400, req.t('missing_params', req));
  const fromPoint = draw(req.body.fromLatitude, req.body.fromLongitude);
  const toPoint = draw(req.body.toLatitude, req.body.toLongitude);

  await busRoutes
    .findOrCreate({
      where: {
        origin: req.body.origin,
        destination: req.body.destination,
        code: req.body.code,
        distance: req.body.distance,
      },
      defaults: { fromCoordinates: fromPoint, toCoordinates: toPoint },
    })
    .then((created) => {
      created[1]
        ? responseHandler(res, 200, req.t('created_ok'), req)
        : responseHandler(res, 400, req.t('already_exist'), req);
    });
};

const findAll = async (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  await busRoutes.findAndCountAll({ limit, offset }).then((data) => {
    const response = getPagingData(data, page, limit);
    res.send(response);
  });
};

const fetchOne = async (req, res) => {
  const id = req.params.id;

  await busRoutes
    .findOne({
      where: {
        routeId: id,
      },
    })
    .then((data) => {
      null != data
        ? responseHandler(res, 200, data)
        : responseHandler(res, 404, req.t('not_found'), req);
    });
};

const updateRoute = async (req, res) => {
  const id = req.params.id;
  let fromLatitude = req.body.fromLatitude;
  let fromLongitude = req.body.fromLongitude;
  let toLatitude = req.body.toLatitude;
  let toLongitude = req.body.toLongitude;
  await busRoutes.findOne({ where: { routeId: id } }).then((data) => {
    if (data != null) {
      req.body.fromLatitude == undefined
        ? (fromLatitude = data.fromCoordinates[0])
        : req.body.fromLatitude;
      req.body.fromLongitude == undefined
        ? (fromLongitude = data.fromCoordinates[1])
        : req.body.fromLongitude;
      req.body.toLatitude == undefined
        ? (toLatitude = data.toCoordinates[0])
        : req.body.toLatitude;
      req.body.toLongitude == undefined
        ? (toLongitude = data.toCoordinates[1])
        : req.body.toLongitude;
    } else {
      responseHandler(res, 400, req.t('updated_invalid_req'), req);
    }
  });

  await busRoutes
    .update(
      {
        origin: req.body.origin,
        destination: req.body.destination,
        code: req.body.code,
        distance: req.body.distance,
        fromCoordinates: draw(fromLatitude, fromLongitude),
        toCoordinates: draw(toLatitude, toLongitude),
      },
      {
        where: { routeId: id },
      }
    )
    .then((num) => {
      num[1].length > 0 && responseHandler(res, 200, req.t('updated_ok'), req);
    });
};

const removeRoute = async (req, res) => {
  const id = req.params.id;

  await busRoutes
    .destroy({
      where: { routeId: id },
    })
    .then((num) => {
      1 == num
        ? responseHandler(res, 200, req.t('deleted_ok'))
        : responseHandler(res, 400, req.t('delete_invalid_req'), req);
    });
};

const deleteAll = async (req, res) => {
  await busRoutes
    .destroy({
      where: {},
      truncate: false,
    })
    .then((nums) => {
      responseHandler(res, 200, req.t('many_deleted'), req);
    });
};

export {
  addRoute,
  findAll,
  fetchOne as findOne,
  updateRoute,
  removeRoute,
  deleteAll,
};
