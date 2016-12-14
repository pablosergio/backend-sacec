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

    var modeloDepartamentos = db.model('public.modeloDepartamento');


    var getAllModeloDepartamentos = function(filter, paging, order){
        return modeloDepartamentos.findAndCountAll({
             where: filter,
             limit: paging.limit,
             offset: paging.start,
             order: order
        })
    };

    var createModeloDepartamento = function(nuevoModeloDepartamento){
          var deferred = q.defer();  
          modeloDepartamentos
            .findOrCreate({where: nuevoModeloDepartamento})
            .spread(function(modeloDepartamento, created) {
                deferred.resolve({ modeloDepartamento: modeloDepartamento, created: created})
          })

        return deferred.promise;
    };

    var updateModeloDepartamento = function(modeloDepartamento){
          return modeloDepartamentos.update(modeloDepartamento, { where: { modeloDepartamentoId: modeloDepartamento.modeloDepartamentoId }});
          
    };

      var deleteModeloDepartamento = function(modeloDepartamento){
          return modeloDepartamentos.destroy({ where: { modeloDepartamentoId: modeloDepartamento.modeloDepartamentoId }});
          
    };


    return {
        getAllModeloDepartamentos: getAllModeloDepartamentos,
        createModeloDepartamento: createModeloDepartamento,
        updateModeloDepartamento: updateModeloDepartamento,
        deleteModeloDepartamento: deleteModeloDepartamento
    }
};