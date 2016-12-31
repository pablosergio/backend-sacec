/**
 * Created by Sergio on 10/12/2016.
 */
var departamentoService = require('../services/departamentoService.js');
var tokenService       = require('../services/tokenService');
var jwt                = require('jsonwebtoken');
var cfg                = require('config');
var _                  = require('lodash');
var filterService      = require('../services/filterService');      

var departamentoHandler = function() {
    this.getDepartamentos = handleGetDepartamentosRequest;
    this.createDepartamento = handleCreateDepartamentoRequest;
    this.updateDepartamento = handleUpdateDepartamentoRequest;
    this.deleteDepartamento = handleDeleteDepartamentoRequest;
}

function handleGetDepartamentosRequest(req, res, next) {
    var token = tokenService.getToken(req);
    var payload = jwt.decode(token, {complete: true}).payload;
    var departamento = filterService.removeKeysNull(req.query);
    var paging = {
        limit: req.query.limit || 1000,
        start: req.query.start || 0
    };

    var order = '"' + req.query.sort + '"' + ' ' +  req.query.dir;

    var service = departamentoService({username: payload.username, password: payload.password});
    service.getAllDepartamentos(departamento, paging, order).then(function(result){
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

function handleCreateDepartamentoRequest(req, res, next) {
    var token = tokenService.getToken(req);
    var payload = jwt.decode(token, {complete: true}).payload;
    var service = departamentoService({username: payload.username, password: payload.password});
    service.createDepartamento(req.body).then(function(result){
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

function handleUpdateDepartamentoRequest(req, res, next) {
    var token = tokenService.getToken(req);
    var payload = jwt.decode(token, {complete: true}).payload;
    var service = departamentoService({username: payload.username, password: payload.password});
    service.updateDepartamento(req.body).then(function(result){
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

function handleDeleteDepartamentoRequest(req, res, next) {
    var token = tokenService.getToken(req);
    var payload = jwt.decode(token, {complete: true}).payload;
    var service = departamentoService({username: payload.username, password: payload.password});
    service.deleteDepartamento(req.body).then(function(result){
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

module.exports = departamentoHandler;