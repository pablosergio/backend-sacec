/**
 * Created by Sergio on 10/12/2016.
 */
var propietarioService = require('../services/propietarioService.js');
var tokenService = require('../services/tokenService');
var jwt         = require('jsonwebtoken');

var propietarioHandler = function() {
    this.getPropietarios = handleGetPropietariosRequest;
};

function handleGetPropietariosRequest(req, res, next) {
    var token = tokenService.getToken(req);
    var payload = jwt.decode(token, {complete: true}).payload;
    var filter = {};
    var paging = {
        limit: req.query.limit || 1000,
        start: req.query.start || 0
    }
    var service = propietarioService({username: payload.username, password: payload.password});
    service.getAllPropietarios(filter, paging).then(function(result){
        res.status(201).send({
            success: true,
            rows: result.rows,
            total: result.count
        })
    }, function(err){
        res.status(500);
        res.send(err);
        return next(new Error(err));
    })
}

module.exports = propietarioHandler;