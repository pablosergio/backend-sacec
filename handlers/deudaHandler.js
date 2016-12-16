/**
 * Created by Sergio on 10/12/2016.
 */
var deudaService = require('../services/deudaService.js');
var tokenService       = require('../services/tokenService');
var jwt                = require('jsonwebtoken');
var cfg                = require('config');
var _                  = require('lodash');
var filterService      = require('../services/filterService');      

var deudaHandler = function() {
    this.getDeudas = handleGetDeudasRequest;
    this.getDeudaByTipoTarifa = handleGetDeudaByTipoTarifaRequest;
    this.createDeuda = handleCreateDeudaRequest;
    this.updateDeuda = handleUpdateDeudaRequest;
    this.deleteDeuda = handleDeleteDeudaRequest;
}

function handleGetDeudasRequest(req, res, next) {
    var token = tokenService.getToken(req);
    var payload = jwt.decode(token, {complete: true}).payload;
    var deuda = filterService.removeKeysNull(req.query);
    var paging = {
        limit: req.query.limit || 1000,
        start: req.query.start || 0
    };

    var order = '"' + req.query.sort + '"' + ' ' +  req.query.dir;

    var service = deudaService({username: payload.username, password: payload.password});
    service.getAllDeudas(deuda, paging, order).then(function(result){
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

function handleGetDeudaByTipoTarifaRequest(req, res, next) {
    var token = tokenService.getToken(req);
    var payload = jwt.decode(token, {complete: true}).payload;
    var paging = {
        limit: req.query.limit || 1000,
        start: req.query.start || 0
    };
    var deuda = filterService.removeKeysNull(req.query);
    var order = '"' + req.query.sort + '"' + ' ' +  req.query.dir;

    var service = deudaService({username: payload.username, password: payload.password});
    service.getDeudaByTipoTarifa(deuda, paging, order).then(function(result){
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

function handleCreateDeudaRequest(req, res, next) {
    var token = tokenService.getToken(req);
    var payload = jwt.decode(token, {complete: true}).payload;
    var service = deudaService({username: payload.username, password: payload.password});
    service.createDeuda(req.body).then(function(result){
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

function handleUpdateDeudaRequest(req, res, next) {
    var token = tokenService.getToken(req);
    var payload = jwt.decode(token, {complete: true}).payload;
    var service = deudaService({username: payload.username, password: payload.password});
    service.updateDeuda(req.body).then(function(result){
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

function handleDeleteDeudaRequest(req, res, next) {
    var token = tokenService.getToken(req);
    var payload = jwt.decode(token, {complete: true}).payload;
    var service = deudaService({username: payload.username, password: payload.password});
    service.deleteDeuda(req.body).then(function(result){
        res.status(200).send({
            success: true,
            data:result,
            msg:  cfg.get("COMMON.success")
        })
    }, function(err){
        res.status(500);
        res.send("ha ocurrido un error grave");
        return next(new Error(err));
    })
}

module.exports = deudaHandler;