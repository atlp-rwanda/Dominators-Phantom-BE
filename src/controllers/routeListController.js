import responseHandler from '../utils/responseHandler';
import model from '../database/models'

import { getPagination } from '../utils/paginationHandler';
import { getPagingData } from '../utils/paginationHandler';


const busRoutes = model.Route;

const findAll = async (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    await busRoutes.findAndCountAll({ 
        limit, offset,
        // include: [{model: model.Bus, as: 'Buses'}],
        // include:'Buses',
        include: busRoutes.associations.Buses,
        distinct: true,   
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

    await busRoutes.findOne({
        include: [{model: model.Bus, as: 'Buses'}],
        distinct: true,   
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

export {  
    findAll, 
    findOne
}