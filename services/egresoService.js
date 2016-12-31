/**
 * Created by Sergio on 10/12/2016.
 */
var q = require('q');

module.exports = function(connection){
    var db = require('../model');
    db.setup(process.env.DATA_BASE, connection.username, connection.password,{
        host: process.env.DB_SERVER,
        logging: false,
        native: false
    });

    var  egresos = db.model('public.egresos');
         
    var getAllEgresos = function(filter, paging, order){
        return egresos.findAndCountAll({
            where: filter,
            limit: paging.limit,
            offset: paging.start,
            order: order,
        })
    }

    var createEgreso = function(egreso){
          return egresos
            .create({
                tipoEgreso: egreso.tipoEgreso, 
                descripcion: egreso.descripcion,
                totalEgreso: egreso.totalEgreso, 
                numeroComprobante: egreso.numeroComprobante,
                observacion: egreso.observacion,
                fechaEgreso: egreso.fechaEgreso
            });

    };

    var updateEgreso = function(egreso){
          return egresos.update(egreso, { where: { egresoId:egreso.egresoId }});
          
    };

    var deleteEgreso = function(egreso){
          return egresos.destroy({ where: { egresoId: egreso.egresoId }});
          
    };


    return {
        getAllEgresos: getAllEgresos,
        createEgreso: createEgreso,
        updateEgreso: updateEgreso,
        deleteEgreso: deleteEgreso
    }
};