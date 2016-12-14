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

    var departamentos      = db.model('public.departamentos'),
         modeloDepartamento = db.model('public.modeloDepartamento'),
         propietario        = db.model('public.propietarios');

    var getAllDepartamentos = function(filter, paging, order){
        return departamentos.findAndCountAll({
            where: filter,
            limit: paging.limit,
            offset: paging.start,
            order: order,
            include: [
                { model: propietario, as: 'propietario' },
                { model: modeloDepartamento, as: 'modeloDepartamento' }
            ]
        })
    }

    var createDepartamento = function(departamento){
          return departamentos
            .create({
                nombre: departamento.nombre, 
                modeloDepartamentoId: departamento.modeloDepartamentoId, 
                propietarioId: departamento.propietarioId, 
                cantidadHabitantes: departamento.cantidadHabitantes
            });

    };

    var updateDepartamento = function(departamento){
          return departamentos.update(departamento, { where: { departamentoId: departamento.departamentoId }});
          
    };

      var deleteDepartamento = function(departamento){
          return departamentos.destroy({ where: { departamentoId: departamento.departamentoId }});
          
    };


    return {
        getAllDepartamentos: getAllDepartamentos,
        createDepartamento: createDepartamento,
        updateDepartamento: updateDepartamento,
        deleteDepartamento: deleteDepartamento
    }
};