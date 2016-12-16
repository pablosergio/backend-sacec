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

    var estructuraTarifaria = db.model('public.estructuraTarifaria'),
         modeloDepartamento = db.model('public.modeloDepartamento');

    var getAllEstructuraTarifaria = function(filter, paging, order){
        return estructuraTarifaria.findAndCountAll({
            where: filter,
            limit: paging.limit,
            offset: paging.start,
            order: order,
            include: [
                { model: modeloDepartamento, as: 'modeloDepartamento' }
            ]
        })
    }

    var createEstructuraTarifaria = function(nuevaEstructuraTarifaria){
          return estructuraTarifaria
            .create({
                tipoTarifa: nuevaEstructuraTarifaria.tipoTarifa, 
                gestion: nuevaEstructuraTarifaria.gestion, 
                modeloDepartamentoId: nuevaEstructuraTarifaria.modeloDepartamentoId, 
                precio: nuevaEstructuraTarifaria.precio, 
                descripcion: nuevaEstructuraTarifaria.descripcion 
            });

    };

    var updateEstructuraTarifaria = function(estructuratarifaria){
          return estructuraTarifaria.update(estructuratarifaria, { where: { estructuraTarifariaId: estructuratarifaria.estructuraTarifariaId }});
          
    };

      var deleteEstructuraTarifaria = function(estructuratarifaria){
          return estructuraTarifaria.destroy({ where: { estructuraTarifariaId: estructuratarifaria.estructuraTarifariaId }});
          
    };


    return {
        getAllEstructuraTarifaria: getAllEstructuraTarifaria,
        createEstructuraTarifaria: createEstructuraTarifaria,
        updateEstructuraTarifaria: updateEstructuraTarifaria,
        deleteEstructuraTarifaria: deleteEstructuraTarifaria
    }
};