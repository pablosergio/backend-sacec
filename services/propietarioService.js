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

    var propietarios = db.model('public.propietarios');


    var getAllPropietarios = function(filter, paging, order){
        return propietarios.findAndCountAll({
             where: filter,
             limit: paging.limit,
             offset: paging.start,
             order: order
        })
    };

    var createPropietario = function(nuevoPropietario){
          var deferred = q.defer();  
          propietarios
            .findOrCreate({where: nuevoPropietario})
            .spread(function(propietario, created) {
                deferred.resolve({ propietario: propietario, created: created})
          })

        return deferred.promise;
    };

    var updatePropietario = function(propietario){
          return propietarios.update(propietario, { where: { propietarioId: propietario.propietarioId }});
          
    };

      var deletePropietario = function(propietario){
          return propietarios.destroy({ where: { propietarioId: propietario.propietarioId }});
          
    };


    return {
        getAllPropietarios: getAllPropietarios,
        createPropietario: createPropietario,
        updatePropietario: updatePropietario,
        deletePropietario: deletePropietario
    }
};