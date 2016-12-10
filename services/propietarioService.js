/**
 * Created by Sergio on 10/12/2016.
 */
var q = require('q');
module.exports = function(connection){
    var db = require('../model');
    db.setup(process.env.DATA_BASE, connection.user, connection.password,{
        host: process.env.DB_SERVER,
        logging: false,
        native: false
    });

    var propietarios = db.model('public.propietarios');


    var getAllPropietarios = function(params){
        return propietarios.findAll({
            limit : params.limit,
            //offset : req.query.offset,
            where : params.params,
        })
    };


    return {
        getAllPropietarios: getAllPropietarios,
    }
};