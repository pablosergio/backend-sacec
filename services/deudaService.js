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

    var  deudas              = db.model('public.deudas'),
         departamento        = db.model('public.departamentos'),
         modeloDepartamento  = db.model('public.modeloDepartamento'),
         propietario         = db.model('public.propietarios'),
         estructuraTarifaria = db.model('public.estructuraTarifaria');

    var getAllDeudas = function(filter, paging, order){
        return deudas.findAndCountAll({
            where: filter,
            limit: paging.limit,
            offset: paging.start,
            order: order,
            include: [
                { 
                    model: departamento, 
                    as: 'departamento',
                    include: [{
                        model: propietario,
                        as: 'propietario'
                    }, {
                        model: modeloDepartamento,
                        as: 'modeloDepartamento'
                    }]
                },
                //{ model: estructuraTarifaria, as: 'estructuraTarifaria' }
            ]
        })
    }

    var getDeudaByTipoTarifa = function(filter, paging, order){
        return deudas.findAndCountAll({
            where: filter,
            limit: paging.limit,
            offset: paging.start,
            order: order,
            include: [
                { 
                    model: departamento, 
                    as: 'departamento',
                    include: [{
                        model: propietario,
                        as: 'propietario'
                    }, {
                        model: modeloDepartamento,
                        as: 'modeloDepartamento'
                    }]
                },
                //{ model: estructuraTarifaria, as: 'estructuraTarifaria' }
            ]
        })
    }

    var createDeuda = function(deuda){
          return deudas
            .create({
                nombre: deuda.nombre, 
                modeloDeudaId: deuda.modeloDeudaId, 
                propietarioId: deuda.propietarioId, 
                cantidadHabitantes: deuda.cantidadHabitantes
            });

    };

    var updateDeuda = function(deuda){
          return deudas.update(deuda, { where: { deudaId: deuda.DeudaId }});
          
    };

      var deleteDeuda = function(deuda){
          return deudas.destroy({ where: { deudaId: deuda.DeudaId }});
          
    };


    return {
        getAllDeudas: getAllDeudas,
        getDeudaByTipoTarifa: getDeudaByTipoTarifa,
        createDeuda: createDeuda,
        updateDeuda: updateDeuda,
        deleteDeuda: deleteDeuda
    }
};