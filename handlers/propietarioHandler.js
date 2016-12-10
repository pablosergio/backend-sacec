/**
 * Created by Sergio on 10/12/2016.
 */
var propietarioService = require('../services/propietarioService.js');

var propietarioHandler = function() {
    this.getPropietarios = handleGetPropietariosRequest;
};

function handleGetPropietariosRequest(req, res, next) {
    var service = propietarioService({user: 'postgres', password:'postgres'});
    service.getAllPropietarios({ limit: 25, params: {}}).then(function(result){
        res.status(201).send({
            success: true,
            data:result
        })
    }, function(err){
        res.status(500);
        res.send(err);
        return next(new Error(err));
    })
}

module.exports = propietarioHandler;