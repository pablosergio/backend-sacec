/**
 * Created by Sergio on 10/12/2016.
 */
var modeloDepartamentoService = require('../services/modeloDepartamentoService.js');
var tokenService       = require('../services/tokenService');
var jwt                = require('jsonwebtoken');
var cfg                = require('config');

var modeloDepartamentoHandler = function() {
    this.getModeloDepartamentos = handleGetModeloDepartamentosRequest;
    this.createModeloDepartamento = handleCreateModeloDepartamentoRequest;
    this.updateModeloDepartamento = handleUpdateModeloDepartamentoRequest;
    this.deleteModeloDepartamento = handleDeleteModeloDepartamentoRequest;
}

function handleGetModeloDepartamentosRequest(req, res, next) {
    var token = tokenService.getToken(req);
    var payload = jwt.decode(token, {complete: true}).payload;
    var filter = {};
    var paging = {
        limit: req.query.limit || 1000,
        start: req.query.start || 0
    };

    var order = '"' + req.query.sort + '"' + ' ' +  req.query.dir;

    var service = modeloDepartamentoService({username: payload.username, password: payload.password});
    service.getAllModeloDepartamentos(filter, paging, order).then(function(result){
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

function handleCreateModeloDepartamentoRequest(req, res, next) {
    var token = tokenService.getToken(req);
    var payload = jwt.decode(token, {complete: true}).payload;
    var service = modeloDepartamentoService({username: payload.username, password: payload.password});
    service.createModeloDepartamento(req.body).then(function(result){
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

function handleUpdateModeloDepartamentoRequest(req, res, next) {
    var token = tokenService.getToken(req);
    var payload = jwt.decode(token, {complete: true}).payload;
    var service = modeloDepartamentoService({username: payload.username, password: payload.password});
    service.updateModeloDepartamento(req.body).then(function(result){
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

function handleDeleteModeloDepartamentoRequest(req, res, next) {
    var token = tokenService.getToken(req);
    var payload = jwt.decode(token, {complete: true}).payload;
    var service = modeloDepartamentoService({username: payload.username, password: payload.password});
    service.deleteModeloDepartamento(req.body).then(function(result){
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

module.exports = modeloDepartamentoHandler;