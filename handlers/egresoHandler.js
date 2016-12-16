/**
 * Created by Sergio on 10/12/2016.
 */
var egresoService = require('../services/egresoService.js');
var tokenService       = require('../services/tokenService');
var jwt                = require('jsonwebtoken');
var cfg                = require('config');
var _                  = require('lodash');
var filterService      = require('../services/filterService');      

var egresoHandler = function() {
    this.getEgresos = handleGetEgresosRequest;
    this.createEgreso = handleCreateEgresoRequest;
    this.updateEgreso = handleUpdateEgresoRequest;
    this.deleteEgreso = handleDeleteEgresoRequest;
}

function handleGetEgresosRequest(req, res, next) {
    var token = tokenService.getToken(req);
    var payload = jwt.decode(token, {complete: true}).payload;
    var egreso = filterService.removeKeysNull(req.query);
    var paging = {
        limit: req.query.limit || 1000,
        start: req.query.start || 0
    };

    var order = '"' + req.query.sort + '"' + ' ' +  req.query.dir;

    var service = egresoService({username: payload.username, password: payload.password});
    service.getAllEgresos(egreso, paging, order).then(function(result){
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


function handleCreateEgresoRequest(req, res, next) {
    var token = tokenService.getToken(req);
    var payload = jwt.decode(token, {complete: true}).payload;
    var service = egresoService({username: payload.username, password: payload.password});
    service.createEgreso(req.body).then(function(result){
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

function handleUpdateEgresoRequest(req, res, next) {
    var token = tokenService.getToken(req);
    var payload = jwt.decode(token, {complete: true}).payload;
    var service = egresoService({username: payload.username, password: payload.password});
    service.updateEgreso(req.body).then(function(result){
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

function handleDeleteEgresoRequest(req, res, next) {
    var token = tokenService.getToken(req);
    var payload = jwt.decode(token, {complete: true}).payload;
    var service = egresoService({username: payload.username, password: payload.password});
    service.deleteEgreso(req.body).then(function(result){
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

module.exports = egresoHandler;