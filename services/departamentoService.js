/**
 * Created by Sergio on 10/12/2016.
 */
module.exports = function(connection){
    var db = require('../model');
    db.setup(process.env.DATA_BASE, connection.username, connection.password,{
        host: process.env.DB_SERVER,
        logging: false,
        native: false
    });

    var departamentos = db.model('public.departamentos'),
        modelo = db.model('public.modeloDepto'),
        propietario = db.model('public.propietarios');

    var getAllDepartamentos = function(filter, paging){
        return departamentos.findAndCountAll({
            where: filter,
            limit: paging.limit,
            offset: paging.start,
            include: [
                { model: propietario, as: 'propietario' },
                { model: modelo, as: 'modelo' }
            ]
        })
    }

    return {
        getAllDepartamentos: getAllDepartamentos,

    }
};