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

    var listas = db.model('public.listas');


    var getAllListas = function(filter, paging, order){
      return listas.findAndCountAll({
             where: filter,
             limit: paging.limit,
             offset: paging.start,
             order: order
        })
    };

    var getListaByTipo = function(lista, paging, order){
        return listas.findAndCountAll({
             where: {tipo: lista.tipo},
             limit: paging.limit,
             offset: paging.start,
             order: order
        })
    };

    var createLista = function(nuevaLista){
          var deferred = q.defer();  
          listas
            .findOrCreate({where: nuevaLista})
            .spread(function(lista, created) {
                deferred.resolve({ lista: lista, created: created})
          })

        return deferred.promise;
    };

    var updateLista = function(lista){
          return listas.update(lista, { where: { listaId: lista.listaId }});
          
    };

      var deleteLista = function(lista){
          return listas.destroy({ where: { listaId: lista.listaId }});
          
    };


    return {
        getAllListas: getAllListas,
        getListaByTipo: getListaByTipo,
        createLista: createLista,
        updateLista: updateLista,
        deleteLista: deleteLista
    }
};