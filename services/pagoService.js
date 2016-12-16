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

    var  pagos = db.model('public.pagos');
         
    var getAllPagos = function(filter, paging, order){
        return pagos.findAndCountAll({
            where: filter,
            limit: paging.limit,
            offset: paging.start,
            order: order,
        })
    }

    var createPago = function(pago){
          return pagos
            .create({
                deudaId: pago.deudaId, 
                tipoTarifa: pago.tipoTarifa, 
                precio: pago.precio, 
                pagadoPor: pago.pagadoPor,
                observacion: pago.observacion,
                fechaRegistro: pago.fechaRegistro
            });

    };

    var updatePago = function(pago){
          return pagos.update(pago, { where: { pagoId: pago.pagoId }});
          
    };

    var deletePago = function(pago){
          return pagos.destroy({ where: { pagoId: pago.pagoId }});
          
    };


    return {
        getAllPagos: getAllPagos,
        createPago: createPago,
        updatePago: updatePago,
        deletePago: deletePago
    }
};