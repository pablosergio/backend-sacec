/**
 * Created by Sergio on 10/12/2016.
 */
var propietarioService = require('../services/propietarioService.js');
var tokenService       = require('../services/tokenService');
var jwt                = require('jsonwebtoken');
var cfg                = require('config');

var propietarioHandler = function() {
    this.getPropietarios = handleGetPropietariosRequest;
    this.createPropietario = handleCreatePropietarioRequest;
    this.updatePropietario = handleUpdatePropietarioRequest;
    this.deletePropietario = handleDeletePropietarioRequest;
}

function handleGetPropietariosRequest(req, res, next) {
    var token = tokenService.getToken(req);
    var payload = jwt.decode(token, {complete: true}).payload;
    var filter = {};
    var paging = {
        limit: req.query.limit || 1000,
        start: req.query.start || 0
    };

    var order = '"' + req.query.sort + '"' + ' ' +  req.query.dir;

    var service = propietarioService({username: payload.username, password: payload.password});
    service.getAllPropietarios(filter, paging, order).then(function(result){
        res.status(200).send({
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

function handleCreatePropietarioRequest(req, res, next) {
    var token = tokenService.getToken(req);
    var payload = jwt.decode(token, {complete: true}).payload;
    var service = propietarioService({username: payload.username, password: payload.password});
    service.createPropietario(req.body).then(function(result){
        res.status(201).send({
            success: true,
            data: result,
            msg: cfg.get("COMMON.success") 
        })
    }, function(err){
        res.status(500);
        res.send(err);
        return next(new Error(err));
    })
}

function handleUpdatePropietarioRequest(req, res, next) {
    var token = tokenService.getToken(req);
    var payload = jwt.decode(token, {complete: true}).payload;
    var service = propietarioService({username: payload.username, password: payload.password});
    service.updatePropietario(req.body).then(function(result){
        res.status(200).send({
            success: true,
            data:result,
            msg: cfg.get("COMMON.success")
        })
    }, function(err){
        res.status(500);
        res.send(err);
        return next(new Error(err));
    })
}

function handleDeletePropietarioRequest(req, res, next) {
    var token = tokenService.getToken(req);
    var payload = jwt.decode(token, {complete: true}).payload;
    var service = propietarioService({username: payload.username, password: payload.password});
    service.deletePropietario(req.body).then(function(result){
        res.status(200).send({
            success: true,
            data:result,
            msg:  cfg.get("COMMON.success")
        })
    }, function(err){
        res.status(500);
        res.send("ha ocurrido un eerror grave");
        return next(new Error(err));
    })
}

module.exports = propietarioHandler;